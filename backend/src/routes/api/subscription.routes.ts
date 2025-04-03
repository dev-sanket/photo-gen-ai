import express from 'express'
import { SubscriptionController } from '../../controllers'
import { asyncHandler, bindControllerMethods } from '../../utils'
import { verifyClerkJWTToken } from '../../middlewares'

const router = express.Router()

const subscriptionController = new SubscriptionController()
const subscriptionBindController = bindControllerMethods(subscriptionController)

router.get(
  '/',
  verifyClerkJWTToken,
  asyncHandler(subscriptionBindController.getAllSubscriptions)
)

router.get(
  '/:id',
  verifyClerkJWTToken,
  asyncHandler(subscriptionBindController.getSubscriptionById)
)

export default router
