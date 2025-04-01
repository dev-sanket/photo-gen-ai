import { DataSource } from 'typeorm'
import { BaseRepository } from './base.repository'
import { FeaturePricing } from '../entities'
import { IFeaturePrice } from 'src/types'

export class FeaturePriceRepository extends BaseRepository<FeaturePricing> {
  private dataSource: DataSource

  constructor(dataSource: DataSource) {
    super(dataSource, FeaturePricing)
    this.dataSource = dataSource
  }
  async bulkCreate(outputImages: IFeaturePrice[]): Promise<IFeaturePrice[]> {
    const resp = await this.dataSource.manager.insert(
      FeaturePricing,
      outputImages
    )
    // const createdRecords = await this.dataSource.manager.find(FeaturePricing, {
    //   where: {
    //     id: In(resp.identifiers.map(id => id.id))
    //   }
    // })
    return resp.raw
  }
}
