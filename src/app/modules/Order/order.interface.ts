import { Types } from 'mongoose'

type TProducts = {
  productId: Types.ObjectId
  quantity: number
}

export type TOrder = {
  products: TProducts[]
  customerName: string
  district: string
  thana: string
  address: string
  phoneNumber: string
  totalPrice: number
  email?: string
  additionalInfo?: string
  status?: 'pending' | 'cancelled' | 'delivered' | 'processing'
  orderedBy?: Types.ObjectId
  orderedDate?: Date
}
