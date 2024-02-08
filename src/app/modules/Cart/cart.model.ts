import { Schema, model } from 'mongoose'
import { TCart } from './cart.interface'

const CartSchema = new Schema<TCart>({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
        errorMessages: {
          required: 'Product is required',
        },
      },
      quantity: {
        type: Number,
        required: true,
        errorMessages: {
          required: 'Quantity is required',
        },
      },
    },
  ],
  cartAddedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  cartAddedDate: {
    type: Date,
    default: Date.now,
  },
})

export const Cart = model('Cart', CartSchema)
