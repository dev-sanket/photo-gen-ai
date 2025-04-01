import { DataSource } from 'typeorm'
import { Model } from '../entities/model.entity'

import { BaseRepository } from './base.repository'

export class ModelRepository extends BaseRepository<Model> {
  constructor(dataSource: DataSource) {
    super(dataSource, Model)
  }
}
