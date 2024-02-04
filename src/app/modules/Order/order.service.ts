import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { User } from '../User/user.model'
import { TOrder } from './order.interface'
import { Order } from './order.model'
import { Product } from '../Product/product.model'
import QueryBuilder from '../../builder/queryBuilder'
import { JwtPayload } from 'jsonwebtoken'

const addNewOrderIntoDB = async (payload: TOrder, _id: string | null) => {
  const { products } = payload
  if (_id) {
    const isUserExist = await User.findById(_id)
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }
  }
  if (products.length > 0) {
    products.forEach(async (product) => {
      const isProductExist = await Product.findById(product.productId)
      if (!isProductExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
      }
    })
  }

  const result = await Order.create({
    ...payload,
    orderedBy: _id,
    cartAdded: false,
  })
  return result
}

const addNewProductToCartIntoDB = async (
  payload: TOrder,
  _id: string | null,
) => {
  const { products } = payload
  if (_id) {
    const isUserExist = await User.findById(_id)
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }
  }
  if (products.length > 0) {
    products.forEach(async (product) => {
      const isProductExist = await Product.findById(product.productId)
      if (!isProductExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
      }
    })
  }

  const result = await Order.create({
    ...payload,
    orderedBy: _id,
    cartAdded: true,
  })
  return result
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
  result?.forEach((order) => {
    order?.products?.forEach((product) => {
      totalPrice += product?.quantity * product?.productId?.price
    })
  })
  return {
    orders: result,
    totalPrice,
  }
}
const getAllCartItemsOfAnUserFromDB = async (id: string, user: JwtPayload) => {
  const result = await Order.find({ orderedBy: id, cartAdded: true }).populate({
    path: 'products.productId',
    select:
      'title price image description category sellerName size color companyName',
  })
  if (user.role === 'user') {
    result.forEach((order) => {
      const isOrderBelongsToUser = order?.orderedBy?.toString() === user._id
      if (!isOrderBelongsToUser) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized')
      }
    })
  }
  let totalPrice: number = 0
  result?.forEach((order) => {
    order?.products?.forEach((product) => {
      totalPrice += product?.quantity * product?.productId?.price
    })
  })
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
  const totalOrderPrice = orders.reduce((total, order) => {
    const orderTotal = order.products.reduce((productTotal, product) => {
      const productPrice = product.productId?.price || 0
      const quantity = product.quantity || 0
      return productTotal + productPrice * quantity
    }, 0)
    return total + orderTotal
  }, 0)

  return { orders, totalOrderPrice }
}

export const orderService = {
  addNewOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  getAllOrdersOfAnUserFromDB,
  addNewProductToCartIntoDB,
  getAllCartItemsOfAnUserFromDB,
  cartItemToOrderIntoDB,
  getOrderByMonthFromDB,
}
