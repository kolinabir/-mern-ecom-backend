import httpStatus from 'http-status'
import catchAsync from '../Utils/catchAsync'
import sendResponse from '../Utils/sendResponse'
import { ProductServices } from './product.service'

const createNewProduct = catchAsync(async (req, res) => {
  const result = await await ProductServices.createProductIntoDB(
    req.body,
    req.user._id,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product added successfully',
    data: result,
  })
})

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All products retrieved successfully',
    data: result,
  })
})

const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getSingleProductFromDB(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Retrieved successfully',
    data: result,
  })
})

const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.updateProductFromDB(
    req.params.id,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  })
})

const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.deleteProductFromDB(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  })
})

const getProductsByCategory = catchAsync(async (req, res) => {
  const result = await ProductServices.getProductByCategoryFromDB(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All products retrieved successfully',
    data: result,
  })
})

const getQuantityOfZero = catchAsync(async (req, res) => {
  const result = await ProductServices.getQuantityOfZero()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All products with quantity 0 retrieved successfully',
    data: result,
  })
})

export const ProductControllers = {
  createNewProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getQuantityOfZero,
}
