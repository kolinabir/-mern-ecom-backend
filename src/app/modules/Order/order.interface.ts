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
  quantity: number
  address?: string
  phoneNumber: string
  TotalPrice: number
  email?: string
  additionalInfo?: string
  status?: 'pending' | 'cancelled' | 'delivered' | 'processing'
  userId?: Types.ObjectId
  orderedDate?: Date
}
