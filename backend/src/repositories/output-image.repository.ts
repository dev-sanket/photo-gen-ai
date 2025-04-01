import { DataSource } from 'typeorm'
import { OutputImages } from '../entities/output-image.entity'
import { BaseRepository } from './base.repository'
import { IOutPutImages } from '../types'

export class OutputImagesRepository extends BaseRepository<OutputImages> {
  private dataSource: DataSource

  constructor(dataSource: DataSource) {
    super(dataSource, OutputImages)
    this.dataSource = dataSource
  }
  async bulkCreate(outputImages: IOutPutImages[]): Promise<IOutPutImages[]> {
    const resp = await this.dataSource.manager.insert(
      OutputImages,
      outputImages
    )
    return resp.raw
  }
}
