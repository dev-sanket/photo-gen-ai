import express from 'express'
import ClerkWebHook from './clerk-webhook.router'

const router = express.Router()

router.use('/clerk', ClerkWebHook)

export default router
