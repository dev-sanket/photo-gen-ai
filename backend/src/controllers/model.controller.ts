import { ModelService } from '../services/model.service'
import { NextFunction, Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { ApiResponse, IModel } from '../types'

export class ModelController {
  private modelService: ModelService

  constructor() {
    this.modelService = new ModelService()
  }
  public async getModelsByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ApiResponse<IModel[]>> {
    const userId = req.userId as string
    const { skip = '0', limit = '10' } = req.params
    const data = await this.modelService.getModelsByUser(
      userId,
      Number(skip),
      Number(limit)
    )
    return { data, message: 'Success', status: 200 }
  }

  public async createPresignedUrl(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ApiResponse<object>> {
    const userId = req.userId as string
    const presignedUrl = await this.modelService.createPresignedUrl(userId)
    return { data: { presignedUrl }, message: 'Success', status: 200 }
  }
  async trainModel(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ApiResponse<IModel>> {
    const userId = req.userId as string
    const requestBody = req.body as IModel
    const createdModel = await this.modelService.trainModel(requestBody, userId)
    return { data: createdModel, message: 'Model created', status: 201 }
  }
}
