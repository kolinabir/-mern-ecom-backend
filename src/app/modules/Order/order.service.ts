import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { User } from '../User/user.model'
import { TOrder } from './order.interface'
import { Order } from './order.model'
import { Product } from '../Product/product.model'
import QueryBuilder from '../../builder/queryBuilder'

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
  })
  return result
}

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = [
    'products.productId',
    'status',
    'orderedBy',
    'phoneNumber',
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

export const orderService = {
  addNewOrderIntoDB,
  getAllOrdersFromDB,
}
