import { ModelService } from '../services'
import { Request } from 'express'
import { ApiResponse, IModel } from '../types'

export class ModelController {
  private modelService: ModelService

  constructor() {
    this.modelService = new ModelService()
  }
  public async getModelsByUser(req: Request): Promise<ApiResponse<IModel[]>> {
    const { skip = '0', limit = '10', userId } = req.params
    const data = await this.modelService.getModelsByUser(
      userId,
      Number(skip),
      Number(limit)
    )
    return { data, message: 'Success', status: 200 }
  }

  public async createPresignedUrl(req: Request): Promise<ApiResponse<object>> {
    const userId = req.userId as string
    const presignedUrl = await this.modelService.createPresignedUrl(userId)
    return { data: { presignedUrl }, message: 'Success', status: 200 }
  }

  async trainModel(req: Request): Promise<ApiResponse<IModel>> {
    const userId = req.userId as string
    const requestBody = req.body as IModel
    const createdModel = await this.modelService.trainModel(requestBody, userId)
    return { data: createdModel, message: 'Model created', status: 201 }
  }
}
