import { PayAsYouGoPackageRepository } from '../repositories'
import { AppDataSource } from '../config/database'
import { IPayAsYouGo } from '../types'

export const seedPayAsYouGoPackages = async () => {
  const paygRepository = new PayAsYouGoPackageRepository(AppDataSource)

  // Check if PAYG packages already exist
  const existingPackages = await paygRepository.findAll()
  if (existingPackages.length > 0) {
    console.log('PAYG Packages already seeded')
    return // Exit the function if PAYG packages are already present
  }
  // Seed PAYG Packages
  const packages: IPayAsYouGo[] = [
    {
      packageName: 'Small',
      priceINR: 99,
      priceUSD: 1.49,
      priceEUR: 1.29,
      coinAllowance: 500,
      bonusCoins: 150,
      isActive: false
    },
    {
      packageName: 'Medium',
      priceINR: 249,
      priceUSD: 3.99,
      priceEUR: 3.49,
      coinAllowance: 1500,
      bonusCoins: 250,
      isActive: false
    },
    {
      packageName: 'Large',
      priceINR: 499,
      priceUSD: 7.99,
      priceEUR: 6.99,
      coinAllowance: 3000,
      bonusCoins: 500,
      isActive: false
    }
  ]

  await paygRepository.bulkCreate(packages)

  console.log('Feature Pricing seeded successfully')
}
