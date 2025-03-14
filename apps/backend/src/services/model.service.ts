import { AppDataSource } from '../config/database'
import { ModelRepository } from '../repositories/mode.repository'

export class ModelService {
  private modelRepository: ModelRepository

  constructor() {
    this.modelRepository = new ModelRepository(AppDataSource)
  }

  async createPresignedUrl(): Promise<string> {
    return ''
  }
}
