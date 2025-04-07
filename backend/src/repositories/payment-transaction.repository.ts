import { DataSource } from 'typeorm'
import { BaseRepository } from './base.repository'
import { PaymentTransaction } from '../entities/payment-transaction.entity'

export class PaymentTransactionRepository extends BaseRepository<PaymentTransaction> {
  constructor(private readonly dataSource: DataSource) {
    super(dataSource, PaymentTransaction)
  }
}
