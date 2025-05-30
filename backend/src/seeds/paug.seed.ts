import { AppDataSource } from '../config/database'
import { PayAsYouGoPackage } from '../entities/paug.entity'
import { PayAsYouGoPrice } from '../entities/paug-price.entity'
import { IPayAsYouGo } from '../types'

export const seedPayAsYouGoPackages = async () => {
  const packageRepository = AppDataSource.getRepository(PayAsYouGoPackage)

  // Check if PAYG packages already exist
  const existing = await packageRepository.find()
  if (existing.length > 0) {
    console.log('PAYG Packages already seeded')
    return
  }

  // Package definitions with prices by country
  const packages: IPayAsYouGo[] = [
    {
      packageName: 'Small',
      coinAllowance: 500,
      bonusCoins: 150,
      isPopular: false,
      description: 'Small package for light users',
      isActive: true,
      prices: [
        { countryCode: 'IN', currency: 'INR', price: 99, actualPrice: 99 },
        { countryCode: 'US', currency: 'USD', price: 1.49, actualPrice: 1.49 },
        { countryCode: 'FR', currency: 'EUR', price: 1.29, actualPrice: 1.29 }
      ]
    },
    {
      packageName: 'Medium',
      coinAllowance: 1500,
      bonusCoins: 250,
      isPopular: false,
      description: 'Medium package for moderate users',
      isActive: true,
      prices: [
        { countryCode: 'IN', currency: 'INR', price: 249, actualPrice: 249 },
        { countryCode: 'US', currency: 'USD', price: 3.99, actualPrice: 3.99 },
        { countryCode: 'FR', currency: 'EUR', price: 3.49, actualPrice: 3.49 }
      ]
    },
    {
      packageName: 'Large',
      coinAllowance: 3000,
      bonusCoins: 500,
      isPopular: false,
      description: 'Large package for heavy users',
      isActive: true,
      prices: [
        { countryCode: 'IN', currency: 'INR', price: 499, actualPrice: 499 },
        { countryCode: 'US', currency: 'USD', price: 7.99, actualPrice: 7.99 },
        { countryCode: 'FR', currency: 'EUR', price: 6.99, actualPrice: 6.99 }
      ]
    }
  ]

  // Save packages and prices
  for (const pkg of packages) {
    const packageEntity = packageRepository.create({
      packageName: pkg.packageName,
      coinAllowance: pkg.coinAllowance,
      bonusCoins: pkg.bonusCoins,
      isActive: pkg.isActive,
      description: pkg.description
    })

    const savedPackage = await packageRepository.save(packageEntity)

    const priceRepository = AppDataSource.getRepository(PayAsYouGoPrice)
    const priceEntities = pkg.prices.map((price) =>
      priceRepository.create({
        ...price,
        package: savedPackage
      })
    )

    await priceRepository.save(priceEntities)
  }

  console.log('PAYG Packages with regional prices seeded successfully')
}
