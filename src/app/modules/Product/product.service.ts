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

  //review bug will be fixed
  // review wont show when fetching all products
  return result
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

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
}
