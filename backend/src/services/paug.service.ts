import { AppDataSource } from '../config/database'
import { PayAsYouGoPackageRepository } from '../repositories'
import { errorTypes } from '../utils'

const { ResourceNotFoundError } = errorTypes

export class PayAsYouGoService {
  private readonly paugRepository: PayAsYouGoPackageRepository
  constructor() {
    this.paugRepository = new PayAsYouGoPackageRepository(AppDataSource)
  }

  async getPayAsYouGoPackages() {
    return await this.paugRepository.findAll()
  }

  async getPayAsYouGoPackageById(id: number) {
    const paug = await this.paugRepository.findById(id)
    if (!paug) {
      throw new ResourceNotFoundError('Pay as you go package', id.toString())
    }
    return paug
  }

  async getPayAsYouGoPackageByCurrency(currency: string) {
    return await this.paugRepository.findAll({
      relations: {
        prices: true
      },
      where: {
        prices: {
          currency: currency
        }
      }
    })
  }

  async getPayAsYouGoPackageByCountryAndCurrency(
    country: string,
    currency: string
  ) {
    return await this.paugRepository.findAll({
      relations: {
        prices: true
      },
      where: {
        prices: {
          currency,
          countryCode: country
        }
      }
    })
  }
}
