import { Router } from 'express'
import { CategoryControllers } from './category.controllers'
import auth from '../../middleWares/auth'
import { USER_ROLE } from '../User/user.constant'

const router = Router()

router.post('/', auth(USER_ROLE.admin), CategoryControllers.createCategory)
router.get('/', CategoryControllers.getAllCategories)
router.get('/:id', CategoryControllers.getSingleCategoryByID)
router.patch('/:id', CategoryControllers.updateCategoryByID)
router.delete('/:id', CategoryControllers.deleteCategoryByID)

export const categoryRoutes = router
