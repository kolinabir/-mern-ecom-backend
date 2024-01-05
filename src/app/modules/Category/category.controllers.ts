import catchAsync from '../Utils/catchAsync'
import sendResponse from '../Utils/sendResponse'
import httpStatus from 'http-status'
import { CategoryService } from './category.service'

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.createCategoryIntoDB(
    req.body,
    req.user._id,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully',
    data: result,
  })
})

const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryService.getAllCategoriesFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Categories fetched successfully',
    data: result,
  })
})

const getSingleCategoryByID = catchAsync(async (req, res) => {
  const result = await CategoryService.getSingleCategoryByIDFromDB(
    req.params.id,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Category fetched successfully',
    data: result,
  })
})

const updateCategoryByID = catchAsync(async (req, res) => {
  const result = await CategoryService.updateCategoryByIDFromDB(
    req.params.id,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  })
})

const deleteCategoryByID = catchAsync(async (req, res) => {
  const result = await CategoryService.deleteCategoryByIDFromDB(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully',
    data: result,
  })
})

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getSingleCategoryByID,
  updateCategoryByID,
  deleteCategoryByID,
}
