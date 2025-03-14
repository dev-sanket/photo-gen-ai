import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseModel } from './base.entity'
import { User } from './user.entity'
import { OutputGeneratedStatusEnum, IOutPutImages } from 'common'

@Entity({ name: 'output_images' })
export class OutputImages extends BaseModel implements IOutPutImages {
  @Column({
    type: 'varchar'
  })
  modelId: string = ''
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

  @ManyToOne(() => User, (user) => user.outputImages)
  @JoinColumn({ name: 'userId' })
  user: User | undefined

  @Column({ name: 'user_id' })
  userId: number = 0
}
