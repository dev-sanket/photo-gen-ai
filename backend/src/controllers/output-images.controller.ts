import { NextFunction, Request, Response } from 'express'
import { OutputImagesService } from '../services/output-images.service'
import { ApiResponse, IOutPutImages } from '../types'

export class OutputImageController {
  private outputImageService: OutputImagesService

  constructor() {
    this.outputImageService = new OutputImagesService()
  }

  async getImagesByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ApiResponse<IOutPutImages[]>> {
    const userId = req.params.userId as string
    const outputImages =
      await this.outputImageService.getAllOutputImagesByUserId(userId)
    return {
      data: outputImages,
      message: 'Output image created',
      status: 201
    }
  }
}
