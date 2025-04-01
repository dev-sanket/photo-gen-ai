import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseModel } from './base.entity'
import { User } from './user.entity'
import { OutputGeneratedStatusEnum } from '../enums'
import { IOutPutImages } from '../types'
import { Model } from './model.entity'

@Entity({ name: 'output_images' })
export class OutputImages extends BaseModel implements IOutPutImages {
  @Column({
    type: 'varchar'
  })
  outputUrl: string = ''
  @Column({
    type: 'varchar'
  })
  prompt: string = ''
  @Column({
    type: 'enum',
    enum: OutputGeneratedStatusEnum
  })
  status: OutputGeneratedStatusEnum = OutputGeneratedStatusEnum.IN_PROGRESS

  @Column({
    name: 'model_id'
  })
  modelId!: number

  @ManyToOne(() => Model, (model) => model.id)
  @JoinColumn({ name: 'model_id' })
  model: Model | undefined

  @ManyToOne(() => User, (user) => user.outputImages)
  @JoinColumn({ name: 'user_id' })
  user: User | undefined

  @Column({ name: 'user_id' })
  userId: number = 0
}
