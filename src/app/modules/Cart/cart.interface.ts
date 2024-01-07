import { Types } from 'mongoose'

export type TCart = {
  productId: Types.ObjectId
  quantity: number
  price?: number
  status?: 'pending' | 'cancelled' | 'delivered' | 'processing'
  userId?: Types.ObjectId
  orderedDate?: Date
  address?: string
  phoneNumber?: string
  orderedStatus?: 'On Cart' | 'Ordered'
}
