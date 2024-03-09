/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../error/AppError'
import { Category } from '../Category/category.model'
import { Review } from '../Review/review.model'
import { TProduct } from './product.interface'
import { Product } from './product.model'

const createProductIntoDB = async (payload: TProduct, _id: string) => {
  const checkIfCategoryExists = await Category.findOne({
    _id: payload.category,
  })
  if (!checkIfCategoryExists) {
    throw new AppError(404, 'Category not found')
  }
  const result = await Product.create({
    ...payload,
    addedBy: _id,
  })
  return result
}

const getAllProductsFromDB = async () => {
  const result = await Product.find()
    .populate({
      path: 'category',
      select: 'name',
    })
    .populate({
      path: 'addedBy',
      select: 'username',
    })
    .populate({
      // by virtual from product.model.ts
      path: 'reviews',
      select: 'review rating createdAt createdBy',
    })
    .where('quantity')
    .gt(0)
  ///check if quantity is more than 0

  const productsWithAverageRating = await Promise.all(
    result.map(async (product) => {
      const averageRating = await product
        .populate('reviews')
        .then((populatedProduct: any) => populatedProduct.averageRating) // Update the type declaration of populatedProduct
      return {
        ...product.toJSON(),
        averageRating,
      }
    }),
  )

  return {
    products: productsWithAverageRating,
    availableProduct: result.length,
  }
}
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id)
    .populate({
      path: 'category',
      select: 'name',
    })
    .populate({
      path: 'addedBy',
      select: 'username',
    })
  const review = await Review.find({ productID: id }).select(
    'review rating createdAt createdBy',
  )

  return { ...result?.toObject(), review }
}

const updateProductFromDB = async (id: string, payload: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id)
  return result
}

const getProductByCategoryFromDB = async (id: string) => {
  const result = await Product.find({ category: id }).populate({
    path: 'category',
    select: 'name',
  })

  return result
}

const getQuantityOfZero = async () => {
  const result = await Product.find()
    .where('quantity')
    .equals(0)
    .populate({
      path: 'category',
      select: 'name',
    })
    .populate({
      path: 'addedBy',
      select: 'username',
    })
  return {
    products: result,
    availableProduct: result.length,
  }
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
  getProductByCategoryFromDB,
  getQuantityOfZero,
}
