import AppError from '../../error/AppError'
import { TReview } from './review.interface'
import { Review } from './review.model'

const createReviewIntoDB = async (payload: TReview, _id: string) => {
  // const checkIfCategoryExists = await Course.findOne({
  //   _id: payload.productID,
  // })
  // if (!checkIfCategoryExists) {
  //   throw new AppError(404, 'Course not found')
  // }
  const result = await Review.create({
    ...payload,
    createdBy: _id,
  })
  return result
}

const getAllReviewsFromDB = async () => {
  const result = await Review.find().populate('productID')
  return result
}

export const ReviewService = {
  createReviewIntoDB,
  getAllReviewsFromDB,
}
