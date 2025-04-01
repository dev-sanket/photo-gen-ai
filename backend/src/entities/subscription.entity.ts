import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseModel } from './base.entity'
import { User } from './user.entity'
import { ISubscription } from '../types'

@Entity({ name: 'subscription' })
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

  @ManyToOne(() => User, (user) => user.outputImages)
  @JoinColumn({ name: 'userId' })
  user: User | undefined

  @Column({ name: 'user_id' })
  userId: number = 0
}
