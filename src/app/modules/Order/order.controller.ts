import httpStatus from 'http-status'
import catchAsync from '../Utils/catchAsync'
import sendResponse from '../Utils/sendResponse'
import { orderService } from './order.service'

const addNewOrder = catchAsync(async (req, res) => {
  const id = req.user?._id || null
  const result = await orderService.addNewOrderIntoDB(req.body, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Ordered successfully',
    data: result,
  })
})

const getAllOrders = catchAsync(async (req, res) => {
  const result = await orderService.getAllOrdersFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All orders fetched successfully',
    data: result,
  })
})

const getSingleOrder = catchAsync(async (req, res) => {
  const result = await orderService.getSingleOrderFromDB(
    req.params.id,
    req.user,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  })
})

const getAllOrdersOfAnUser = catchAsync(async (req, res) => {
  const result = await orderService.getAllOrdersOfAnUserFromDB(
    req.params.id,
    req.user,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All orders fetched successfully',
    data: result,
  })
})

const cartItemToOrder = catchAsync(async (req, res) => {
  const result = await orderService.cartItemToOrderIntoDB(
    req.params.id,
    req.user,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Ordered successfully',
    data: result,
  })
})

const getOrderByMonth = catchAsync(async (req, res) => {
  const result = await orderService.getOrderByMonthFromDB(req.user, req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All orders fetched successfully',
    data: result,
  })
})

const changeOrderStatus = catchAsync(async (req, res) => {
  //check if user is admin
  if (req.user?.role !== 'admin') {
    sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Unauthorized',
      data: null,
    })
    return
  }
  const result = await orderService.changeOrderStatus(
    req.params.id,
    req.body.status,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order status changed successfully',
    data: result,
  })
})

export const orderController = {
  addNewOrder,
  getAllOrders,
  getSingleOrder,
  getAllOrdersOfAnUser,
  cartItemToOrder,
  getOrderByMonth,
  changeOrderStatus,
}
