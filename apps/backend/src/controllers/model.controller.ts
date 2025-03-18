import { ApiResponse } from 'common'
import { ModelService } from '../services/model.service'
import { NextFunction, Request, Response } from 'express'

export class ModelController {
  private modelService: ModelService

  constructor() {
    this.modelService = new ModelService()
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
  ): Promise<ApiResponse<string>> {
    return { data: '', message: 'Success', status: 200 }
  }
}
