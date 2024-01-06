import { Router } from 'express'
import { categoryRoutes } from '../modules/Category/category.routes'
import { reviewRoutes } from '../modules/Review/review.routes'
import { AuthRoute } from '../modules/Auth/auth.route'
import { productRoutes } from '../modules/Product/product.routes'

const router = Router()

const modulesRoutes = [
  {
    path: '/categories',
    router: categoryRoutes,
  },
  {
    path: '/reviews',
    router: reviewRoutes,
  },
  {
    path: '/auth',
    router: AuthRoute,
  },
  {
    path: '/product',
    router: productRoutes,
  },
]
modulesRoutes.forEach((route) => router.use(route.path, route.router))

export default router
