import httpStatus from 'http-status'
import catchAsync from '../Utils/catchAsync'
import sendResponse from '../Utils/sendResponse'

const addNewOrder = catchAsync(async (req, res) => {
  const result = await orderService.addNewOrder(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Ordered successfully',
    data: result,
  })
})

const getAllOrders = catchAsync(async (req, res) => {
  const result = await orderService.getAllOrders()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All orders fetched successfully',
    data: result,
  })
})

const getSingleOrder = catchAsync(async (req, res) => {
  const result = await orderService.getSingleOrder(req.params.id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  })
})

export const orderController = {
  addNewOrder,
  getAllOrders,
  getSingleOrder,
}
