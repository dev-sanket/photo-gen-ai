import { Column, Entity } from 'typeorm'
import { BaseModel } from './base.entity'
import { IPayAsYouGo } from '../types'

@Entity({ name: 'paugs' })
export class PayAsYouGoPackage extends BaseModel implements IPayAsYouGo {
  @Column({ type: 'varchar' })
  packageName: string = ''

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
