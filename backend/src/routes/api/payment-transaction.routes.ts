import { PaymentTransactionController } from '../../controllers'
import express from 'express'
import { asyncHandler, bindControllerMethods } from '../../utils'
import { verifyClerkJWTToken } from '../../middlewares'

const router = express.Router()

const paymentTransactionController = new PaymentTransactionController()
const paymentTransactionBindController = bindControllerMethods(
  paymentTransactionController
)

router.post(
  '/create-order',
  verifyClerkJWTToken,
  asyncHandler(paymentTransactionBindController.createPaymentTransaction)
)

export default router
