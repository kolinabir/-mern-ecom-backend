import httpStatus from 'http-status'
import catchAsync from '../Utils/catchAsync'
import sendResponse from '../Utils/sendResponse'
import { cartService } from './cart.service'

const getAllCartItems = catchAsync(async (req, res) => {
  const result = await cartService.getAllCartItemsOfAnUserFromDB(
    req.params.id,
    req.user,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Cart Items fetched successfully',
    data: result,
  })
})
const addNewProductToCart = catchAsync(async (req, res) => {
  const id = req.user?._id || null
  const result = await cartService.addNewProductToCartIntoDB(req.body, id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product added to cart successfully',
    data: result,
  })
})



export const cartController = {
  addNewProductToCart,
  getAllCartItems,
}
