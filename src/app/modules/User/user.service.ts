import { TUser } from './user.interface'
import { PassWords, User } from './user.model'

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload)
  const pass = await PassWords.create({
    userId: result._id,
    current: payload.password,
  })
  const { password, ...user } = result.toObject()
  return user
}

export const UserService = {
  createUserIntoDB,
}
