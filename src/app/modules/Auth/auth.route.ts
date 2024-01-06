import { Router } from 'express'
import validateRequest from '../../middleWares/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'
import { UserValidations } from '../User/user.validation'
import { UserController } from '../User/user.controller'
import auth from '../../middleWares/auth'
import { USER_ROLE } from '../User/user.constant'

const router = Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
)
router.post(
  '/change-password',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword,
)

router.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  UserController.createUser,
)

router.get(
  '/check-auth',
  auth(USER_ROLE.user, USER_ROLE.admin),
  AuthController.checkAuthentication,
)

export const AuthRoute = router
