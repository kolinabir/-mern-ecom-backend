import { Router } from 'express'
import { orderController } from './order.controller'
import validateRequest from '../../middleWares/validateRequest'
import { orderValidateSchema } from './order.validation'
import auth from '../../middleWares/auth'
import { USER_ROLE } from '../User/user.constant'

const router = Router()

router.post(
  '/',
  (req, res, next) => {
    if (req.headers.authorization) {
      auth(USER_ROLE.user)(req, res, next)
    } else {
      next() // unregister user also can order !!
    }
  },
  validateRequest(orderValidateSchema.createOrderValidationSchema),
  orderController.addNewOrder,
)

router.post(
  '/addProductToCart',
  auth(USER_ROLE.user),
  validateRequest(orderValidateSchema.createOrderValidationSchema),
  orderController.addNewProductToCart,
)

router.get('/', auth(USER_ROLE.admin), orderController.getAllOrders)
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  orderController.getSingleOrder,
)

router.get(
  '/user/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  orderController.getAllOrdersOfAnUser,
)
router.get(
  '/user/cart/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  orderController.getAllCartItems,
)
router.patch(
  '/user/cartToOrder/:id',
  auth(USER_ROLE.user),
  orderController.cartItemToOrder,
)

export const orderRoutes = router
