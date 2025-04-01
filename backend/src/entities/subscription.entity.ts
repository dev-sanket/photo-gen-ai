import { Column, Entity } from 'typeorm'
import { BaseModel } from './base.entity'
import { ISubscription } from '../types'

@Entity({ name: 'subscriptions' })
export class Subscription extends BaseModel implements ISubscription {
  @Column({ type: 'varchar' })
  planName: string = '' // Basic, Pro, Premium

  @Column({ type: 'numeric' })
  priceINR: number = 0

  @Column({ type: 'numeric' })
  priceUSD: number = 0

  @Column({ type: 'numeric' })
  priceEUR: number = 0

  @Column({ type: 'numeric' })
  coinAllowance: number = 0

  @Column({ type: 'numeric' })
  bonusCoins: number = 0

  @Column({ type: 'boolean', default: true })
  isActive: boolean = true
}
