import { Column, Entity } from 'typeorm'
import { BaseModel } from './base.entity'
import { IFeaturePrice } from '../types/index'

@Entity({ name: 'feature-prices' })
export class FeaturePricing extends BaseModel implements IFeaturePrice {
  @Column({ type: 'varchar', unique: true, nullable: false })
  featureName!: string // e.g., "Basic_Image", "HD_Image", "AI_Video"

  @Column({ type: 'varchar' })
  featureDisplayName!: string // e.g., "Basic Image", "HD Image", "AI Video"

  @Column({ type: 'numeric' })
  coinCost: number = 0

  @Column({ type: 'varchar', nullable: true })
  imageQuality?: string // e.g., "512x512", "1024x1024", "2048x2048"

  @Column({ nullable: true })
  videoGenerationCost!: number // Cost in coins for AI video generation

  @Column({ nullable: true })
  watermarkRemovalCost!: number // Cost in coins to remove watermark

  @Column({ type: 'boolean', default: true })
  isActive: boolean = true
}
