import { DataSource } from 'typeorm'
import { OutputImages } from '../entities/output-images.entity'
import { BaseRepository } from './base.repository'
import { IOutPutImages } from '../types'

export class OutputImagesRepository extends BaseRepository<OutputImages> {
  private dataSource: DataSource

  constructor(dataSource: DataSource) {
    super(dataSource, OutputImages)
    this.dataSource = dataSource
  }
  bulkCreate(outputImages: IOutPutImages[]): Promise<IOutPutImages[]> {
    return this.dataSource.manager.save(outputImages)
  }
}
