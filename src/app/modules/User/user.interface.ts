/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'
import { USER_ROLE } from './user.constant'

export interface TUser {
  _id: any
  toObject(): { [x: string]: any; password: any; __v: any }
  username: string
  email: string
  password: string
  role: 'user' | 'admin'
}

export interface UserModel extends Model<TUser> {
  isUserExistsByUserName: (username: string) => Promise<TUser>
  isPasswordMatch: (
    plainTextPassword: string,
    hashedPassword: string,
  ) => Promise<boolean>
}

export type TPassWords = {
  userId?: Types.ObjectId
  previous1?: string
  previous2?: string
  current: string
}

export type TUSER_ROLE = keyof typeof USER_ROLE
