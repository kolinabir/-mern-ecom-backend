import { Router } from 'express'
import { ReviewControllers } from './review.controllers'
import auth from '../../middleWares/auth'
import { USER_ROLE } from '../User/user.constant'

const router = Router()

router.post('/', auth(USER_ROLE.user), ReviewControllers.createReview)
router.get('/', ReviewControllers.getAllReviews)
// router.get('/:id', ReviewControllers.getSingleCourseByID)
// router.patch('/:id', CourseControllers.updateCourseByID)
// // router.delete('/:id', CategoryControllers.deleteCategoryByID)

export const reviewRoutes = router
