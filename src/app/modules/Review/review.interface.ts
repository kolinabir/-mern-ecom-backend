import { Types } from 'mongoose'

export type TReview = {
  productID: Types.ObjectId
  rating: number
  review: string
  createdBy?: Types.ObjectId
}
