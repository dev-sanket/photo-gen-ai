import { AppDataSource } from '../config/database'
import { ModelRepository } from '../repositories/mode.repository'
import { AWSService } from './aws.service'

export class ModelService {
  private modelRepository: ModelRepository
  private awsService: AWSService

  constructor() {
    this.modelRepository = new ModelRepository(AppDataSource)
    this.awsService = new AWSService()
  }

  async createPresignedUrl(userId: string): Promise<string> {
    const timestamp = new Date().getTime()
    const filePath = `models/${userId}/model-${timestamp}.zip`
    return await this.awsService.createPresignedUrl(filePath)
  }
}
