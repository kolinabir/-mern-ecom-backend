import { Schema } from 'mongoose'
import { TCart } from './cart.interface'

const cartSchema = new Schema<TCart>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'cancelled', 'delivered', 'processing'],
    default: 'pending',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  orderedDate: {
    type: Date,
    default: Date.now(),
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  orderedStatus: {
    type: String,
    enum: ['On Cart', 'Ordered'],
  },
})
