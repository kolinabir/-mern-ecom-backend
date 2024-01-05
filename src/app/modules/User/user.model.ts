import { Schema, model } from 'mongoose'
import { TPassWords, TUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<TUser, UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
    },
  },
  {
    timestamps: true,
  },
)
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

userSchema.statics.isUserExistsByUserName = async function (username: string) {
  return await User.findOne({ username }).select('+password')
}

userSchema.statics.isPasswordMatch = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

const passWordsSchema = new Schema<TPassWords>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  previous1: {
    type: String,
  },
  previous2: {
    type: String,
  },
  current: {
    type: String,
  },
})
export const PassWords = model<TPassWords>('PassWords', passWordsSchema)

export const User = model<TUser, UserModel>('User', userSchema)
