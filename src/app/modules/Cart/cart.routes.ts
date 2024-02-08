import { Router } from 'express'
import auth from '../../middleWares/auth'
import { USER_ROLE } from '../User/user.constant'
import validateRequest from '../../middleWares/validateRequest'
import { cartController } from './cart.controller'
import { cartValidateSchema } from './cart.validation'

const router = Router()

router.post(
  '/addProductToCart',
  auth(USER_ROLE.user),
  validateRequest(cartValidateSchema.addCartValidationSchema),
  cartController.addNewProductToCart,
)

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  cartController.getAllCartItems,
)

export const cartRoutes = router
