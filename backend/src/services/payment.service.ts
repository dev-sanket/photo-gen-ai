import { PaymentGatewayFactory } from '../class/Payments/paymentgateway.factory'
import { AppDataSource } from '../config/database'
import {
  PayAsYouGoPackageRepository,
  PaymentTransactionRepository,
  UserRepository
} from '../repositories'
import {
  IPaymentTransaction,
  IPaymentGatewayConfig,
  IPaymentRequest,
  IPayAsYouGo
} from '../types'
import { PaymentGatewayType, PaymentStatus, PaymentType } from '../enums'
import { errorTypes, generateUniqueId } from '../utils'
import { DeepPartial } from 'typeorm'
import { PaymentTransaction } from '../entities'

const { ResourceNotFoundError } = errorTypes
class PaymentService {
  private readonly paymentTransactionRepository: PaymentTransactionRepository
  private readonly paugRepo: PayAsYouGoPackageRepository
  private readonly userRepo: UserRepository
  constructor() {
    this.paymentTransactionRepository = new PaymentTransactionRepository(
      AppDataSource
    )
    this.paugRepo = new PayAsYouGoPackageRepository(AppDataSource)
    this.userRepo = new UserRepository()
  }

  async createPaymentTransaction(
    userId: string,
    paymentTransaction: Partial<IPaymentTransaction>
  ): Promise<IPaymentTransaction> {
    let paymentFor: IPayAsYouGo | null = null
    const user = await this.userRepo.getByClerkId(userId)

    if (!user) {
      throw new ResourceNotFoundError('User', userId)
    }

    if (paymentTransaction.paugId) {
      paymentFor = await this.paugRepo.findById(paymentTransaction.paugId, {
        relations: ['prices'],
        where: {
          prices: {
            id: paymentTransaction.paugPriceId || undefined
          }
        }
      })
    }
    // else if(paymentTransaction.subscriptionId) {  // TODO: Add subscription payment
    //     paymentFor = await this.subscriptionRepo.findById(paymentTransaction.subscriptionId)
    // }

    if (!paymentFor) {
      throw new ResourceNotFoundError(
        paymentTransaction.paugId ? 'Paug' : 'Subscription',
        paymentTransaction.paugId ||
          paymentTransaction.subscriptionId!.toString()
      )
    }

    const config: IPaymentGatewayConfig = {
      apiKey: process.env.RAZORPAY_API_KEY || '',
      apiSecret: process.env.RAZORPAY_API_SECRET,
      secretKey: '',
      isLive: false
    }
    const paymentRequest: IPaymentRequest = {
      amount: Number(paymentFor.prices[0].price * 100), // Convert to paise
      currency: paymentFor.prices[0].currency,
      notes: {
        subscriptionId: paymentTransaction.subscriptionId?.toString() || '',
        paugId: paymentTransaction.paugId?.toString() || '',
        userId: userId
      }
    }
    const paymentGateway = await PaymentGatewayFactory.createPaymentGateway(
      PaymentGatewayType.RAZORPAY,
      config
    )
    const paymentResponse = await paymentGateway.processPayment(paymentRequest)
    const body: IPaymentTransaction = {
      ...paymentTransaction,
      transactionStatus: PaymentStatus.PENDING,
      transactionType: PaymentType.PAUG,
      amount: paymentFor.prices[0].price,
      transactionCurrency: paymentFor.prices[0].currency,
      beforeCoins: user.coins,
      afterCoins: user.coins,
      paugId: paymentTransaction.paugId || 0,
      paymentGatewayOrderId: paymentResponse.transactionId || '',
      userId: user.id,
      transactionId: `txn_${generateUniqueId(10)}`,
      paugPriceId: paymentTransaction.paugPriceId,
      paugPrice: paymentFor.prices[0]
    }
    return this.paymentTransactionRepository.create(
      body as DeepPartial<PaymentTransaction>
    )
  }

  async getPaymentTransactions(userId: string, skip: number, limit: number) {
    const user = await this.userRepo.getByClerkId(userId)
    if (!user) {
      throw new ResourceNotFoundError('User', userId)
    }
    return this.paymentTransactionRepository.findAll({
      where: {
        userId: user.id
      },
      skip,
      take: limit
    })
  }

  async getPaymentStatus(order: number) {
    return this.paymentTransactionRepository.findById(id)
  }
}

export default PaymentService
