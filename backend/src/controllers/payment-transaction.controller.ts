import { ApiResponse, IPaymentTransaction } from '../types'
import PaymentService from '../services/payment.service'
import { Request, Response } from 'express'

export class PaymentTransactionController {
  private paymentService: PaymentService
  constructor() {
    this.paymentService = new PaymentService()
  }

  async createPaymentTransaction(
    req: Request,
    res: Response
  ): Promise<ApiResponse<IPaymentTransaction>> {
    const userId = req.userId as string
    const body = req.body as unknown as IPaymentTransaction
    const paymentTransaction =
      await this.paymentService.createPaymentTransaction(userId, body)
    return {
      status: 200,
      message: 'Payment transaction created successfully',
      data: paymentTransaction
    }
  }

  async getPaymentTransactions(
    req: Request,
    res: Response
  ): Promise<ApiResponse<IPaymentTransaction[]>> {
    const userId = req.userId as string
    const paymentTransactions =
      await this.paymentService.getPaymentTransactions(userId)
    return {
      status: 200,
      message: 'Payment transactions fetched successfully',
      data: paymentTransactions
    }
  }
}
