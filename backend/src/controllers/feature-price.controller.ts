import { Request, Response } from 'express'

import { ApiResponse, IFeaturePrice } from '../types'
import { FeaturePriceService } from '../services/feature-price.service'
export class FeaturePriceController {
  private featurePriceService: FeaturePriceService

  constructor() {
    this.featurePriceService = new FeaturePriceService()
  }

  async getAllFeaturePrices(): Promise<ApiResponse<IFeaturePrice[]>> {
    const featurePrices = await this.featurePriceService.getAllFeaturePrices()
    return {
      data: featurePrices,
      message: 'Feature prices fetched successfully',
      status: 200
    }
  }

  async getFeaturePriceById(req: Request): Promise<ApiResponse<IFeaturePrice>> {
    const id = req.params.id
    const featurePrice = await this.featurePriceService.getFeaturePriceById(
      Number(id)
    )
    return {
      data: featurePrice,
      message: 'Feature price fetched successfully',
      status: 200
    }
  }

  async getFeaturePriceByName(
    req: Request
  ): Promise<ApiResponse<IFeaturePrice>> {
    const name = req.params.name
    const featurePrice = await this.featurePriceService.getFeaturePriceByName(
      name
    )
    return {
      data: featurePrice,
      message: 'Feature price fetched successfully',
      status: 200
    }
  }
}
