import express from 'express'
import { asyncHandler } from '../utils/index'
import { ModelController } from '../controllers/model.controller'

const router = express.Router()

const modelController = new ModelController()

router.post('/pre-signed-url', asyncHandler(modelController.createPresignedUrl))
router.post('train', asyncHandler(modelController.trainModel))

export default router
