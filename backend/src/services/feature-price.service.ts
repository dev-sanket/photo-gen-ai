import { AppDataSource } from '../config/database'
import { FeaturePriceRepository } from '../repositories'
import { IFeaturePrice } from 'src/types'
import { ResourceNotFoundError } from '../utils/errors/error-types'

export class FeaturePriceService {
  private readonly featurePriceRepository: FeaturePriceRepository

  constructor() {
    this.featurePriceRepository = new FeaturePriceRepository(AppDataSource)
  }

  async getAllFeaturePrices(): Promise<IFeaturePrice[]> {
    return await this.featurePriceRepository.findAll({
      where: {
        isActive: true
      }
    })
  }

  async getFeaturePriceById(id: number): Promise<IFeaturePrice> {
    const featurePrice = await this.featurePriceRepository.findById(id)
    if (!featurePrice) {
      throw new ResourceNotFoundError('FeaturePrice', id)
    }
    return featurePrice
  }

  async getFeaturePriceByName(name: string): Promise<IFeaturePrice> {
    const featurePrice = await this.featurePriceRepository.findOneBy({
      featureName: name
    })
    if (!featurePrice) {
      throw new ResourceNotFoundError('FeaturePrice', name)
    }
    return featurePrice
  }
}
