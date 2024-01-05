import { Router } from 'express'
import auth from '../../middleWares/auth'
import { USER_ROLE } from '../User/user.constant'
import { ProductControllers } from './product.controller'
import validateRequest from '../../middleWares/validateRequest'
import { ProductValidations } from './product.validation'

const router = Router()

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createNewProduct,
)
router.get('/', ProductControllers.getAllProducts)
router.get('/:id', ProductControllers.getSingleProduct)
router.patch('/:id', ProductControllers.updateProduct)
router.delete('/:id', ProductControllers.deleteProduct)

export const productRoutes = router
