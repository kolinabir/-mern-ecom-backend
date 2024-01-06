import httpStatus from 'http-status'
import catchAsync from '../Utils/catchAsync'
import sendResponse from '../Utils/sendResponse'
import { AuthServices } from './auth.service'

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully',
    data: result,
  })
})
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body
  const result = await AuthServices.changePasswordToServer(
    req.user,
    passwordData,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: result,
  })
})

const checkAuthentication = catchAsync(async (req, res) => {
  const result = await AuthServices.checkAuthentication(req.user)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is authenticated',
    data: req.user,
  })
})

export const AuthController = {
  loginUser,
  changePassword,
  checkAuthentication,
}
