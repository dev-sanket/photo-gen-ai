import { ISubscription } from 'src/types'
import { AppDataSource } from '../config/database'
import { SubscriptionRepository } from '../repositories'
import { ResourceNotFoundError } from '../utils/errors/error-types'

export class SubscriptionService {
  private subscriptionRepository: SubscriptionRepository

  constructor() {
    this.subscriptionRepository = new SubscriptionRepository(AppDataSource)
  }

  async getAllSubscriptions(): Promise<ISubscription[]> {
    return await this.subscriptionRepository.findAll()
  }

  async getSubscriptionById(id: string): Promise<ISubscription> {
    const subscription = await this.subscriptionRepository.findById(id)
    if (!subscription) {
      throw new ResourceNotFoundError('Subscription', id)
    }
    return subscription
  }
}
