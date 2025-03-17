import { ApiResponse } from 'common'
import { ModelService } from '../services/model.service'
import { NextFunction } from 'express'

export class ModelController {
  private modelService: ModelService

  constructor() {
    this.modelService = new ModelService()
  }
  async createPresignedUrl(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ApiResponse<string>> {
    const userId = req.userId
    const presignedUrl = await this.modelService.createPresignedUrl(userId)
    return { data: presignedUrl, message: 'Success', status: 200 }
  }
  async trainModel(): Promise<string> {
    return ''
  }
}
