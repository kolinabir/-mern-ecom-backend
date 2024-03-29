import { Schema, model } from 'mongoose'
import { TOrder } from './order.interface'

const OrderSchema = new Schema<TOrder>({
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
  customerName: {
    type: String,
    required: true,
    errorMessages: {
      required: 'Customer name is required',
    },
  },
  address: {
    type: String,
    required: false,
    errorMessages: {
      required: 'Address is required',
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    errorMessages: {
      required: 'Phone number is required',
    },
  },
  email: {
    type: String,
  },
  additionalInfo: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'cancelled', 'delivered', 'processing'],
    default: 'pending',
    errorMessages: {
      enum: 'Invalid status',
    },
  },
  orderedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  orderedDate: {
    type: Date,
    default: Date.now,
    errorMessages: {
      default: 'Invalid ordered date',
    },
  },
  cartAdded: {
    type: Boolean,
  },
})

export const Order = model('Order', OrderSchema)
