import express from 'express'
import { asyncHandler, bindControllerMethods } from '../../utils/index'
import { FeaturePriceController } from '../../controllers'
import { verifyClerkJWTToken } from '../../middlewares'

const featurePriceController = new FeaturePriceController()
const featurePriceBindController = bindControllerMethods(featurePriceController)

const router = express.Router()

router.get(
  '/',
  verifyClerkJWTToken,
  asyncHandler(featurePriceBindController.getAllFeaturePrices)
)

router.get(
  '/:id',
  verifyClerkJWTToken,
  asyncHandler(featurePriceBindController.getFeaturePriceById)
)

router.get(
  '/:name',
  verifyClerkJWTToken,
  asyncHandler(featurePriceBindController.getFeaturePriceByName)
)

export default router
