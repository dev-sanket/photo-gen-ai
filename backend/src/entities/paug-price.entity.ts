import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseModel } from './base.entity'
import { PayAsYouGoPackage } from './paug.entity'
import { IPaugPrice } from '../types'

@Entity({ name: 'paug_prices' })
export class PayAsYouGoPrice extends BaseModel implements IPaugPrice {
  @ManyToOne(() => PayAsYouGoPackage, (pkg) => pkg.prices)
  package: PayAsYouGoPackage | undefined

  @Column({ type: 'varchar' })
  countryCode: string = ''

  @Column({ type: 'numeric' })
  price: number = 0

  @Column({ type: 'varchar' })
  currency: string = ''

  @Column({ type: 'numeric' })
  actualPrice: number = 0
}
