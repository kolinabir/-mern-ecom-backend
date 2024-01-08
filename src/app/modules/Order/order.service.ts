import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { User } from '../User/user.model'
import { TOrder } from './order.interface'
import { Order } from './order.model'
import { Product } from '../Product/product.model'

const addNewOrderIntoDB = async (payload: TOrder) => {
  const { userId, products } = payload
  if (userId) {
    const isUserExist = await User.findById(userId)
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

  const result = await Order.create(payload)
  return result
}
