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
    // Check if user exists
    const isUserExist = await User.findById(_id)
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }
  }

  if (products.length > 0) {
    for (const product of products) {
      // Check if product exists
      const isProductExist = await Product.findById(product.productId)
      if (!isProductExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
      }
    }

    const cart = await Cart.findOne({ cartAddedBy: _id })

    if (cart) {
      // If the cart exists, update or add products
      for (const product of products) {
        const existingProductIndex = cart.products.findIndex(
          (item) => item.productId.toString() === product.productId.toString(),
        )

        if (existingProductIndex !== -1) {
          // If the product already exists in the cart, update its quantity
          cart.products[existingProductIndex].quantity += product.quantity
        } else {
          // If the product is not in the cart, add it
          cart.products.push({
            productId: product.productId,
            quantity: product.quantity,
          })
        }
      }

      // Save the updated cart
      await cart.save()
    } else {
      // If the cart doesn't exist, create a new cart with the provided products
      const newCart = new Cart({
        cartAddedBy: _id,
        products: products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
        })),
      })

      await newCart.save()
    }
  }
  const result = await Cart.findOne({ cartAddedBy: _id }).populate({
    path: 'products.productId',
    select:
      'title price image description category sellerName size color companyName',
  })
  return result
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

const deleteProductQuantityFromCartInDB = async (
  productId: string,
  _id: string | null,
) => {
  const isCartExist = await Cart.findOne({ cartAddedBy: _id })

  if (isCartExist) {
    // Find the product index in the cart
    const productIndex = isCartExist.products.findIndex(
      (product) => product.productId.toString() === productId,
    )

    if (productIndex !== -1) {
      // If the product exists in the cart, decrease its quantity by one
      isCartExist.products[productIndex].quantity -= 1

      // If the quantity becomes zero, remove the product from the array
      if (isCartExist.products[productIndex].quantity <= 0) {
        isCartExist.products.splice(productIndex, 1)
      }

      // Save the updated cart
      const result = await isCartExist.save()
      return result
    } else {
      throw new AppError(httpStatus.NOT_FOUND, 'Product not found in the cart')
    }
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found')
  }
}

const deleteProductFromCartFromDB = async (
  productId: string,
  _id: string | null,
) => {
  // this will delete the whole product from cart
  const isCartExist = await Cart.findOne({ cartAddedBy: _id })

  if (isCartExist) {
    // Find the product index in the cart
    const productIndex = isCartExist.products.findIndex(
      (product) => product.productId.toString() === productId,
    )

    if (productIndex !== -1) {
      // If the product exists in the cart, remove the product from the array
      isCartExist.products.splice(productIndex, 1)

      // Save the updated cart
      const result = await isCartExist.save()
      return result
    } else {
      throw new AppError(httpStatus.NOT_FOUND, 'Product not found in the cart')
    }
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found')
  }
}

export const cartService = {
  addNewProductToCartIntoDB,
  getAllCartItemsOfAnUserFromDB,
  deleteProductQuantityFromCartInDB,
  deleteProductFromCartFromDB,
}
