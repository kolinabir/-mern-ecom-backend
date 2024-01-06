import { Schema, model } from 'mongoose'
import { TProduct } from './product.interface'
import { Review } from '../Review/review.model'
import { TReview } from '../Review/review.interface'
import { number } from 'zod'

const productSchema = new Schema<TProduct>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    sellerName: {
      type: String,
    },
    policy: {
      type: String,
    },
    size: String,
    color: String,
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    sizes: [String],
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
)

//review bug will be fixed
// review wont show when fetching all products

productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'productID',
})

productSchema.virtual('averageRating').get(async function () {
  const result: TReview[] = await Review.find({
    productID: this._id,
  }).select('rating')

  if (result.length === 0) {
    return 0 // Return 0 if there are no reviews
  }

  const totalRating = result.reduce((sum, review) => sum + review.rating, 0)
  return totalRating / result.length
})


export const Product = model<TProduct>('Product', productSchema)
