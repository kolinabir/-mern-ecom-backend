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
  district: {
    type: String,
    required: true,
    errorMessages: {
      required: 'District is required',
    },
  },
  thana: {
    type: String,
    required: true,
    errorMessages: {
      required: 'Thana is required',
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
    errorMessages: {
      required: 'Email is required',
    },
  },
  additionalInfo: {
    type: String,
    errorMessages: {
      required: 'Additional info is required',
    },
  },
  status: {
    type: String,
    enum: ['pending', 'cancelled', 'delivered', 'processing'],
    default: 'pending',
    errorMessages: {
      enum: 'Invalid status',
    },
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    errorMessages: {
      required: 'User ID is required',
    },
  },
  orderedDate: {
    type: Date,
    default: Date.now,
    errorMessages: {
      default: 'Invalid ordered date',
    },
  },
})

export const Order = model('Order', OrderSchema)
