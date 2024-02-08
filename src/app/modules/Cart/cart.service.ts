import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { User } from '../User/user.model'
import { TCart } from './cart.interface'
import { Product } from '../Product/product.model'
import { Cart } from './cart.model'
import { JwtPayload } from 'jsonwebtoken'

const addNewProductToCartIntoDB = async (
  payload: TCart,
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
  //check if the ordered product is exist in cart and if exist then increase the quantity

  const cartItems = await Cart.find({ cartAddedBy: _id })

  if (cartItems.length > 0) {
    for (const cartItem of cartItems) {
      for (const product of payload.products) {
        const existingProductIndex = cartItem.products.findIndex(
          (item) => item.productId === product.productId,
        )

        if (existingProductIndex !== -1) {
          // If the product already exists in the cart, update its quantity
          await Cart.findByIdAndUpdate(cartItem._id, {
            $inc: {
              [`products.${existingProductIndex}.quantity`]: product.quantity,
            },
          })
        } else {
          // If the product is not in the cart, add it
          await Cart.findByIdAndUpdate(cartItem._id, {
            $push: { products: product },
          })
        }
      }
    }
  }
  return cartItems
}

const getAllCartItemsOfAnUserFromDB = async (id: string, user: JwtPayload) => {
  const result = await Cart.find({ cartAddedBy: id }).populate({
    path: 'products.productId',
    select:
      'title price image description category sellerName size color companyName',
  })
  if (user.role === 'user') {
    result.forEach((order) => {
      const isOrderBelongsToUser = order?.cartAddedBy?.toString() === user._id
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
    totalPrice: totalPrice,
  }
}

export const cartService = {
  addNewProductToCartIntoDB,
  getAllCartItemsOfAnUserFromDB,
}
