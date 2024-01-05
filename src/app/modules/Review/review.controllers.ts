import httpStatus from 'http-status'
import sendResponse from '../Utils/sendResponse'
import catchAsync from '../Utils/catchAsync'
import { ReviewService } from './review.service'

const createReview = catchAsync(async (req, res) => {
  const result = await (
    await ReviewService.createReviewIntoDB(req.body, req.user._id)
  ).populate('createdBy')
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully',
    data: result,
  })
})

const getAllReviews = catchAsync(async (req, res) => {
  const result = await ReviewService.getAllReviewsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Reviews fetched successfully',
    data: result,
  })
})

export const ReviewControllers = {
  createReview,
  getAllReviews,
}
