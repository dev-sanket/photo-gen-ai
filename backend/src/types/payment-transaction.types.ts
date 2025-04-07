import { PaymentStatus } from '../enums'
import { IUser } from './user.types'
import { ISubscription } from './subscription.types'
import { IPaugPrice, IPayAsYouGo } from './paug.types'

export interface IPaymentTransaction {
  transactionId: string
  amount: number
  transactionStatus: PaymentStatus
  paymentTransactionId?: string
  transactionType?: string
  paymentGatewayOrderId: string
  transactionCurrency: string
  userId: number
  user?: IUser | undefined
  subscriptionId?: number | null
  subscription?: ISubscription | null
  paugId?: number | null
  paug?: IPayAsYouGo | null
  beforeCoins: number
  afterCoins: number
  paugPriceId?: number | null
  paugPrice?: IPaugPrice | null
}
