import { Types } from 'mongoose'
import { TProducts } from '../Order/order.interface'

export type TCart = {
  products: TProducts[]
  cartAddedBy?: Types.ObjectId
  cartAddedDate?: Date
}
