import express from 'express'
import ModelRoute from './model.routes'
import UserRoute from './user.routes'
const router = express.Router()

router.use('/model', ModelRoute)
router.use('/user', UserRoute)

export default router
