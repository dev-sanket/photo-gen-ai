import { Column, Entity, OneToMany } from 'typeorm'
import { BaseModel } from './base.entity'
import { IPayAsYouGo } from '../types'
import { PayAsYouGoPrice } from './paug-price.entity'

@Entity({ name: 'paugs' })
export class PayAsYouGoPackage extends BaseModel implements IPayAsYouGo {
  @Column({ type: 'varchar' })
  packageName: string = ''

  @Column({ type: 'numeric' })
  coinAllowance: number = 0

  @Column({ type: 'numeric' })
  bonusCoins: number = 0

  @OneToMany(() => PayAsYouGoPrice, (price) => price.package, {
    cascade: true
  })
  prices!: PayAsYouGoPrice[]

  @Column({ type: 'boolean', default: true })
  isActive: boolean = true
}
