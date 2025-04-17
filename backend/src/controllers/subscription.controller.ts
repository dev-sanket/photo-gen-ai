import { Request, Response } from 'express'
import { ApiResponse, IPayAsYouGo, ISubscription } from '../types'
import { SubscriptionService, PayAsYouGoService } from '../services'

export class SubscriptionController {
  private subscriptionService: SubscriptionService
  private payAsYouGoService: PayAsYouGoService
  constructor() {
    this.subscriptionService = new SubscriptionService()
    this.payAsYouGoService = new PayAsYouGoService()
  }

  async getAllSubscriptions(
    req: Request,
    res: Response
  ): Promise<ApiResponse<{ paugs: IPayAsYouGo[] }>> {
    const { country = 'IN', currency = 'INR' } = req.query

    // const subscriptions = await this.subscriptionService.getAllSubscriptions()
    const paugs =
      await this.payAsYouGoService.getPayAsYouGoPackageByCountryAndCurrency(
        country as string,
        currency as string
      )

    return { data: { paugs }, message: 'Success', status: 200 }
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
