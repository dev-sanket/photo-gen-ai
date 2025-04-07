import { PaymentStatus, PaymentType } from '../enums'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { User } from './user.entity'
import { Subscription } from './subscription.entity'
import { PayAsYouGoPackage } from './paug.entity'
import { BaseModel } from './base.entity'
import { IPaymentTransaction } from '../types'
import { PayAsYouGoPrice } from './paug-price.entity'

@Entity('payment-transaction')
export class PaymentTransaction
  extends BaseModel
  implements IPaymentTransaction
{
  @Column({ type: 'varchar', unique: true, length: 55 })
  transactionId: string = ''

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number = 0.0

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  transactionStatus!: PaymentStatus

  @Column({ type: 'varchar', length: 255, nullable: true })
  paymentTransactionId!: string

  @Column({ type: 'enum', enum: PaymentType, default: PaymentType.PAUG })
  transactionType!: PaymentType

  @Column({ type: 'varchar', length: 255, nullable: true })
  paymentGatewayOrderId!: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  transactionCurrency!: string

  @Column({ name: 'paug_price_id', nullable: true })
  paugPriceId?: number

  @ManyToOne(() => PayAsYouGoPrice, (payAsYouGoPrice) => payAsYouGoPrice.id)
  @JoinColumn({ name: 'paug_price_id' })
  paugPrice: PayAsYouGoPrice | undefined

  // @Column({ name: 'paug_price_id', nullable: true }) // TODO: Add for subscription payment
  // paugPriceId?: number

  // @ManyToOne(() => PayAsYouGoPrice, (payAsYouGoPrice) => payAsYouGoPrice.id)
  // @JoinColumn({ name: 'paug_price_id' })
  // paugPrice: PayAsYouGoPrice | undefined

  @Column({ name: 'user_id', nullable: false })
  userId: number = 0

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User | undefined

  @Column({ name: 'subscription_id', nullable: true })
  subscriptionId?: number

  @ManyToOne(() => Subscription, (subscription) => subscription.id)
  @JoinColumn({ name: 'subscription_id' })
  subscription?: Subscription

  @Column({ name: 'puag_id', nullable: true })
  paugId?: number

  @ManyToOne(() => PayAsYouGoPackage, (puag) => puag.id)
  @JoinColumn({ name: 'puag_id' })
  paug?: PayAsYouGoPackage

  @Column({ type: 'numeric', nullable: false })
  beforeCoins: number = 0.0

  @Column({ type: 'numeric', nullable: false })
  afterCoins: number = 0.0
}
