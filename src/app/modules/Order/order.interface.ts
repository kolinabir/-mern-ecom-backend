import { Types } from 'mongoose'

export type TProducts = {
  productId: Types.ObjectId
  quantity: number
}

export type TOrder = {
  products: TProducts[]
  customerName: string
  address: string
  phoneNumber: string
  email?: string
  additionalInfo?: string
  status?: 'pending' | 'cancelled' | 'delivered' | 'processing'
  orderedBy?: Types.ObjectId
  orderedDate?: Date
  cartAdded: boolean
}
