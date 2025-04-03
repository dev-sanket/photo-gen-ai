import { OutputImageController } from '../../controllers'
import express, { Request, Response, NextFunction } from 'express'
import { asyncHandler, bindControllerMethods } from '../../utils'
import { verifyClerkJWTToken } from '../../middlewares'

const router = express.Router()

const outputImageController = new OutputImageController()
const outputImageBindController = bindControllerMethods(outputImageController)

router.get(
  '/:userId',
  verifyClerkJWTToken,
  asyncHandler(outputImageBindController.getImagesByUserId)
)

export default router
