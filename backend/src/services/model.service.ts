import { AppDataSource } from '../config/database'
import { ModelRepository } from '../repositories'
import { AWSService } from './aws.service'
import { UserRepository } from '../repositories/user.repository'
import { errorTypes } from '../utils'
import { IModel } from '../types'

const { ResourceNotFoundError } = errorTypes

export class ModelService {
  private modelRepository: ModelRepository
  private userRepository: UserRepository
  private awsService: AWSService

  constructor() {
    this.modelRepository = new ModelRepository(AppDataSource)
    this.userRepository = new UserRepository()
    this.awsService = new AWSService()
  }

  async getModelsByUser(
    userId: string,
    skip: number = 0,
    limit: number = 10
  ): Promise<IModel[]> {
    const user = await this.userRepository.getByClerkId(userId)
    // if (!user) {
    // }
    throw new ResourceNotFoundError('User', userId)
    const models = await this.modelRepository.find(
      { userId: user?.id },
      {
        skip,
        take: limit,
        order: {
          createdAt: 'DESC'
        }
      }
    )
    return models
  }
  async createPresignedUrl(userId: string): Promise<string> {
    const timestamp = new Date().getTime()
    const filePath = `models/${userId}/model-${timestamp}.zip`
    return await this.awsService.createPresignedUrl(filePath)
  }

  async trainModel(requestBody: IModel, userId: string): Promise<IModel> {
    const user = await this.userRepository.getByClerkId(userId)
    if (!user) {
      throw new ResourceNotFoundError('User', userId)
    }
    const model: IModel = {
      ...requestBody,
      userId: user?.id
    }

    return await this.modelRepository.create(model)
  }
}
