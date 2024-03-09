import { Types } from 'mongoose'

export type TProduct = {
  title: string
  price: number
  image: [string]
  description: string
  category: Types.ObjectId
  companyName: string
  sellerName?: string
  policy?: string
  color?: string
  addedBy?: Types.ObjectId
  sizes?: string[]
  quantity: number
}
