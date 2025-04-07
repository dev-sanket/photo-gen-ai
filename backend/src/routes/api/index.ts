import express from 'express'
import ModelRoute from './model.routes'
import UserRoute from './user.routes'
import OutputImageRoute from './output-image.routes'
import FeaturePriceRoute from './feature-price.routes'
import SubscriptionRoute from './subscription.routes'
import PaymentTransactionRoute from './payment-transaction.routes'

const router = express.Router()

router.use('/model', ModelRoute)
router.use('/user', UserRoute)
router.use('/output-image', OutputImageRoute)
router.use('/feature-price', FeaturePriceRoute)
router.use('/subscription', SubscriptionRoute)
router.use('/payment', PaymentTransactionRoute)
export default router
