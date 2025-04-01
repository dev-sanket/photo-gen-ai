import { FeaturePriceRepository } from '../repositories'
import { AppDataSource } from '../config/database'
import { IFeaturePrice } from '../types'

export const seedFeaturePricing = async () => {
  const featureRepository = new FeaturePriceRepository(AppDataSource)
  // Check if Feature Pricing already exists
  const existingFeatures = await featureRepository.findAll()

  if (existingFeatures.length > 0) {
    console.log('Feature Pricing already seeded')
    return // Exit the function if Feature Pricing data is already present
  }

  // Seed Feature Pricing
  const features: IFeaturePrice[] = [
    {
      featureName: 'BASIC_IMAGE',
      coinCost: 100,
      imageQuality: '512x512',
      videoGenerationCost: 0,
      watermarkRemovalCost: 0,
      featureDisplayName: 'Basic Image'
    },
    {
      featureName: 'HD_IMAGE',
      coinCost: 300,
      imageQuality: '1024x1024',
      videoGenerationCost: 0,
      watermarkRemovalCost: 0,
      featureDisplayName: 'HD Image'
    },
    {
      featureName: '4K_IMAGE',
      coinCost: 500,
      imageQuality: '2048x2048',
      videoGenerationCost: 0,
      watermarkRemovalCost: 0,
      featureDisplayName: '4K Image'
    },
    {
      featureName: 'AI_VIDEO_GENERATION',
      coinCost: 1000,
      imageQuality: undefined,
      videoGenerationCost: 0,
      watermarkRemovalCost: 0,
      featureDisplayName: 'AI Video Generation'
    },
    {
      featureName: 'WATERMARK_REMOVAL',
      coinCost: 200,
      imageQuality: undefined,
      videoGenerationCost: 0,
      watermarkRemovalCost: 200,
      featureDisplayName: 'Watermark Removal'
    }
  ]

  await featureRepository.bulkCreate(features)

  console.log('Feature Pricing seeded successfully')
}
