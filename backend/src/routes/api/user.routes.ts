import express from 'express'
import { UserController } from '../../controllers'
import { asyncHandler } from '../../utils/index'

const router = express.Router()
const userController = new UserController()

router.get('/', asyncHandler(userController.getAllUsers))
router.get('/:id', userController.getUserById)
router.post('/', userController.createUser)

export default router
