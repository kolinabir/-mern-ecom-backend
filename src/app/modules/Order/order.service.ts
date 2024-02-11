import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { User } from '../User/user.model'
import { TOrder } from './order.interface'
import { Order } from './order.model'
import { Product } from '../Product/product.model'
import QueryBuilder from '../../builder/queryBuilder'
import { JwtPayload } from 'jsonwebtoken'
import { Cart } from '../Cart/cart.model'

const addNewOrderIntoDB = async (payload: TOrder, _id: string | null) => {
  const { products } = payload

  if (_id) {
    const isUserExist = await User.findById(_id)
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }
  }

  if (products.length > 0) {
    for (const product of products) {
      const isProductExist = await Product.findById(product.productId)
      if (!isProductExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
      }
    }

    const result = await Order.create({
      ...payload,
      orderedBy: _id,
      cartAdded: false,
    })

    // Check if the ordered products are in the user's cart and remove them
    const cartItems = await Cart.findOne({ cartAddedBy: _id })
    if (cartItems) {
      const updatedProducts = cartItems.products.filter((cartProduct) => {
        return !products.some((orderedProduct) =>
          cartProduct.productId.equals(orderedProduct.productId),
        )
      })

      // Update the user's cart with the remaining products
      await Cart.findByIdAndUpdate(cartItems._id, { products: updatedProducts })
    }

    return result
  }
}

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = [
    'products.productId',
    'status',
    'orderedBy',
    'phoneNumber',
    'cartAdded',
  ]

  const orderQuery = new QueryBuilder(Order.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = await orderQuery.modelQuery.populate({
    path: 'products.productId',
    select: 'title price image',
  })
  return result
}

const getSingleOrderFromDB = async (id: string, user: JwtPayload) => {
  const result = await Order.findById(id)
  if (user.role === 'user') {
    const isOrderBelongsToUser = result?.orderedBy?.toString() === user._id
    if (!isOrderBelongsToUser) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized')
    }
  }
  return result
}

const getAllOrdersOfAnUserFromDB = async (id: string, user: JwtPayload) => {
  const result = await Order.find({ orderedBy: id, cartAdded: false }).populate(
    {
      path: 'products.productId',
      select:
        'title price image description category sellerName size color companyName',
    },
  )
  if (user.role === 'user') {
    result.forEach((order) => {
      const isOrderBelongsToUser = order?.orderedBy?.toString() === user._id
      if (!isOrderBelongsToUser) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized')
      }
    })
  }
  let totalPrice: number = 0
  for (const order of result) {
    for (const product of order?.products || []) {
      const productDetails = await Product.findById(product.productId)
      if (productDetails) {
        totalPrice += (product?.quantity || 0) * (productDetails?.price || 0)
      }
    }
  }
  return {
    orders: result,
    totalPrice,
  }
}

const cartItemToOrderIntoDB = async (id: string, user: JwtPayload) => {
  const result = await Order.findByIdAndUpdate(id, { cartAdded: false })
  if (user.role === 'user') {
    const isOrderBelongsToUser = result?.orderedBy?.toString() === user._id
    if (!isOrderBelongsToUser) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized')
    }
  }
  return result
}

const getOrderByMonthFromDB = async (
  user: JwtPayload,
  query: Record<string, unknown>,
) => {
  const { month, year, status } = query

  // Ensure that month and year are provided
  if (!month || !year) {
    throw new Error('Month and year are required parameters.')
  }

  // Parse month and year as integers
  const parsedMonth = parseInt(month as string, 10)
  const parsedYear = parseInt(year as string, 10)

  // Validate month and year values
  if (
    isNaN(parsedMonth) ||
    isNaN(parsedYear) ||
    parsedMonth < 1 ||
    parsedMonth > 12
  ) {
    throw new Error('Invalid month or year value.')
  }

  // Calculate the start and end dates for the given month and year
  const startDate = new Date(parsedYear, parsedMonth - 1, 1)
  const endDate = new Date(parsedYear, parsedMonth, 0, 23, 59, 59, 999)

  // Construct the query object for filtering by status
  const statusQuery = status ? { status: status } : {}

  // Fetch orders within the specified date range and status
  const orders = await Order.find({
    orderedDate: { $gte: startDate, $lte: endDate },
    ...statusQuery,
  })
    .populate({
      path: 'products.productId',
      select: 'title price image',
    })
    .exec()

  // Calculate the sum of all orders' prices
  let totalPrice: number = 0
  for (const order of orders) {
    for (const product of order.products) {
      const productDetails = await Product.findById(product.productId)
      if (productDetails) {
        totalPrice += (product.quantity || 0) * (productDetails.price || 0)
      }
    }
  }

  return { orders, totalPrice }
}

export const orderService = {
  addNewOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  getAllOrdersOfAnUserFromDB,
  cartItemToOrderIntoDB,
  getOrderByMonthFromDB,
}
