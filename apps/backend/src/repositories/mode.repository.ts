import { DataSource, Repository } from 'typeorm'
import { Model } from '../entities/model.entity'
import { AppDataSource } from '../config/database'
import { Mode } from 'fs'
import { BaseRepository } from './base.repository'

export class ModelRepository extends BaseRepository<Model> {
  constructor(dataSource: DataSource) {
    super(dataSource, Model)
  }
}
