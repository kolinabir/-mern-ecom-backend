import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { PassWords, User } from '../User/user.model'
import { TLoginUser } from './auth.interface'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import bcrypt from 'bcrypt'

const loginUser = async (payload: TLoginUser) => {
  //check if user exists in database
  const userExists = await User.isUserExistsByUserName(payload?.username)
  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User not found')
  }
  if (!(await User.isPasswordMatch(payload?.password, userExists?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is not correct')
  }
  const token = jwt.sign(
    {
      _id: userExists._id,
      email: userExists.email,
      role: userExists.role,
      iat: Date.now(),
    },
    config.jwt_secret as string,
    {
      expiresIn: '1h',
    },
  )

  const { password, createdAt, updatedAt, __v, ...user } = userExists.toObject()
  return {
    user: user,
    token,
  }
}

const changePasswordToServer = async (
  user: JwtPayload,
  passwordData: { oldPassword: string; newPassword: string },
) => {
  const userExists = await User.findById(user._id).select('+password')
  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User not found')
  }
  if (
    !(await User.isPasswordMatch(
      passwordData.oldPassword,
      userExists?.password,
    ))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password change failed')
  }
  const newHashedPassword = await bcrypt.hash(
    passwordData.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  const passWordList = await PassWords.find({ userId: user._id })
  if (passWordList[0].previous1 && passWordList[0].previous2) {
    const comparePrevious2 = await bcrypt.compare(
      passwordData.newPassword,
      passWordList[0]?.previous2,
    )
    const comparePrevious1 = await bcrypt.compare(
      passwordData.newPassword,
      passWordList[0]?.previous1,
    )
    if (comparePrevious1 || comparePrevious2) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'Password change failed ! password cannot be the same any of the previous two passwords',
      )
    }
  }
  if (passWordList[0].previous1 && !passWordList[0].previous2) {
    const comparePrevious1 = await bcrypt.compare(
      passwordData.newPassword,
      passWordList[0]?.previous1,
    )
    if (comparePrevious1) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'Password change failed ! password cannot be the same as the previous two password',
      )
    }
  }
  if (!passWordList[0]?.previous1 && passWordList[0]?.previous2) {
    const comparePrevious2 = await bcrypt.compare(
      passwordData.newPassword,
      passWordList[0]?.previous2,
    )
    if (comparePrevious2) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'Password change failed does not match previous passwords',
      )
    }
  }

  const result = await User.findOneAndUpdate(
    {
      _id: user._id,
      role: user.role,
    },
    {
      password: newHashedPassword,
    },
    {
      new: true,
    },
  )
  //update password list
  if (!passWordList[0]?.previous1 && !passWordList[0]?.previous2) {
    await PassWords.findOneAndUpdate(
      { userId: user._id },
      {
        previous1: userExists.password,
        current: newHashedPassword,
      },
    )
  }
  if (passWordList[0]?.previous1 && !passWordList[0]?.previous2) {
    await PassWords.findOneAndUpdate(
      { userId: user._id },
      {
        previous2: passWordList[0]?.previous1,
        previous1: userExists.password,
        current: newHashedPassword,
      },
    )
  }
  if (passWordList[0]?.previous1 && passWordList[0]?.previous2) {
    await PassWords.findOneAndUpdate(
      { userId: user._id },
      {
        previous2: passWordList[0]?.previous1,
        previous1: userExists.password,
        current: newHashedPassword,
      },
    )
  }

  const userRes = await User.findById(user._id).select('-__v')
  return userRes
}

const checkAuthentication = async (user: JwtPayload) => {
  const userExists = await User.findById(user._id)
  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User not found')
  }
  return userExists
}

export const AuthServices = {
  loginUser,
  changePasswordToServer,
  checkAuthentication,
}
