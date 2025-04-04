import { v4 as uuidv4 } from 'uuid'

import { PaymentStatus } from '../enums'
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { User } from './user.entity'
import { Subscription } from './subscription.entity'
import { PayAsYouGoPackage } from './paug.entity'
import { BaseModel } from './base.entity'

@Entity('payment-transaction')
export class PaymentTransaction extends BaseModel {
  @Column({ type: 'varchar', unique: true, length: 55 })
  transactionId: string = ''

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number = 0.0

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  transactionStatus?: PaymentStatus

  @Column({ type: 'varchar', length: 255, nullable: true })
  paymentTransactionId?: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  transactionType?: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  transactionCurrency?: string

  @Column({ name: 'user_id', nullable: false })
  userId: number = 0

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User | undefined

  @Column({ name: 'subscription_id' })
  subscriptionId: number = 0

  @ManyToOne(() => Subscription, (subscription) => subscription.id)
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription | undefined

  @Column({ name: 'payment_gateway_id' })
  paymentGatewayId: number = 0

  @ManyToOne(() => PayAsYouGoPackage, (puag) => puag.id)
  @JoinColumn({ name: 'puag_id' })
  paymentGateway: PayAsYouGoPackage | undefined

  @Column({ type: 'numeric', nullable: false })
  beforeCoins: number = 0.0

  @Column({ type: 'numeric', nullable: false })
  afterCoins: number = 0.0

  @BeforeInsert()
  generateId() {
    // Creates an ID like: txn_1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p
    this.transactionId = `txn_${uuidv4()}`
  }
}
