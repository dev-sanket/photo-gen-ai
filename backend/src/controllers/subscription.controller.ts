import { Request, Response } from 'express'
import { ApiResponse, ISubscription } from '../types'
import { SubscriptionService } from '../services/subscription.service'

export class SubscriptionController {
  private subscriptionService: SubscriptionService

  constructor() {
    this.subscriptionService = new SubscriptionService()
  }

  async getAllSubscriptions(
    req: Request,
    res: Response
  ): Promise<ApiResponse<ISubscription[]>> {
    const subscriptions = await this.subscriptionService.getAllSubscriptions()
    return { data: subscriptions, message: 'Success', status: 200 }
  }

  async getSubscriptionById(
    req: Request,
    res: Response
  ): Promise<ApiResponse<ISubscription>> {
    const id = req.params.id
    const subscription = await this.subscriptionService.getSubscriptionById(id)
    return { data: subscription, message: 'Success', status: 200 }
  }
}
