import httpStatus from 'http-status'
import catchAsync from '../Utils/catchAsync'
import sendResponse from '../Utils/sendResponse'
import { UserService } from './user.service'

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUserIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

export const UserController = {
  createUser,
}
