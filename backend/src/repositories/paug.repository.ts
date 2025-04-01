import { DataSource } from 'typeorm'
import { BaseRepository } from './base.repository'
import { PayAsYouGoPackage } from '../entities'
import { IPayAsYouGo } from 'src/types'

export class PayAsYouGoPackageRepository extends BaseRepository<PayAsYouGoPackage> {
  private dataSource: DataSource

  constructor(dataSource: DataSource) {
    super(dataSource, PayAsYouGoPackage)
    this.dataSource = dataSource
  }
  async bulkCreate(outputImages: IPayAsYouGo[]): Promise<IPayAsYouGo[]> {
    const resp = await this.dataSource.manager.insert(
      PayAsYouGoPackage,
      outputImages
    )
    return resp.raw
  }
}
