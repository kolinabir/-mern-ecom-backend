import { TCategory } from './category.interface'
import { Category } from './category.model'

const createCategoryIntoDB = async (payload: TCategory, _id: string) => {
  const result = await Category.create({
    ...payload,
    createdBy: _id,
  })
  return result
}

const getAllCategoriesFromDB = async () => {
  const result = await Category.find().populate('createdBy')
  return result
}

const getSingleCategoryByIDFromDB = async (id: string) => {
  const result = await Category.findById(id)
  return result
}

const updateCategoryByIDFromDB = async (
  id: string,
  payload: Partial<TCategory>,
) => {
  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteCategoryByIDFromDB = async (id: string) => {
  const result = await Category.findByIdAndDelete(id)
  return result
}

export const CategoryService = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getSingleCategoryByIDFromDB,
  updateCategoryByIDFromDB,
  deleteCategoryByIDFromDB,
}
