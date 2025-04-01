import { DataSource } from 'typeorm'
import { Subscription } from '../entities'

import { BaseRepository } from './base.repository'
import { ISubscription } from 'src/types'

export class SubscriptionRepository extends BaseRepository<Subscription> {
  private dataSource: DataSource
  constructor(dataSource: DataSource) {
    super(dataSource, Subscription)
    this.dataSource = dataSource
  }

  async bulkCreate(outputImages: ISubscription[]): Promise<ISubscription[]> {
    const resp = await this.dataSource.manager.insert(
      Subscription,
      outputImages
    )
    return resp.raw
  }
}
