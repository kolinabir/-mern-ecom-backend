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
  const result = await orderQuery.modelQuery
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

export const orderService = {
  addNewOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  getAllOrdersOfAnUserFromDB,
  addNewProductToCartIntoDB,
  getAllCartItemsOfAnUserFromDB,
}
