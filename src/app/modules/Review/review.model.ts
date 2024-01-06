import { Schema, model } from 'mongoose'
import { TReview } from './review.interface'

const reviewSchema = new Schema<TReview>({
  productID: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

export const Review = model<TReview>('Review', reviewSchema)
