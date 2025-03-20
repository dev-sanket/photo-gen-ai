import express from 'express'
import { asyncHandler, bindControllerMethods } from '../../utils/index'
import { ModelController } from '../../controllers/model.controller'
import { verifyClerkJWTToken } from '../../middlewares'

const router = express.Router()

const modelController = new ModelController()
const modelBindController = bindControllerMethods(modelController)

router.get(
  '/',
  verifyClerkJWTToken,
  asyncHandler(modelBindController.getModelsByUser)
)
router.get(
  '/pre-signed-url',
  verifyClerkJWTToken,
  asyncHandler(modelBindController.createPresignedUrl)
)
router.post('train', asyncHandler(modelBindController.trainModel))

export default router
