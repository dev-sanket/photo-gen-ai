import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import {
  GenderEnum,
  EthnicityEnum,
  EyeColorEnum,
  ModelTrainingStatusEnum
} from '../enums'
import { BaseModel } from './base.entity'
import { User } from './user.entity'
import { OutputImages } from './output-images.entity'
import { IModel } from '../types'

@Entity({ name: 'models' })
export class Model extends BaseModel implements IModel {
  @Column({
    type: 'varchar'
  })
  name: string = ''

  @Column({ type: 'enum', default: GenderEnum.MALE, enum: GenderEnum })
  gender: GenderEnum = GenderEnum.MALE

  @Column({
    type: 'varchar'
  })
  age: string = ''

  @Column({
    type: 'enum',
    enum: EthnicityEnum,
    default: EthnicityEnum.SOUTH_EAST_ASIAN
  })
  ethnicity: EthnicityEnum = EthnicityEnum.SOUTH_EAST_ASIAN

  @Column({
    type: 'enum',
    enum: EyeColorEnum,
    default: EyeColorEnum.BLACK
  })
  eyeColor: EyeColorEnum = EyeColorEnum.BLACK

  @Column({
    type: 'boolean',
    default: false
  })
  bald: boolean = false

  @Column({
    type: 'varchar',
    nullable: true
  })
  triggerWord?: string
  @Column({
    type: 'varchar',
    nullable: true
  })
  tensorPath?: string
  @Column({
    type: 'varchar',
    nullable: true
  })
  thumbnailPath?: string

  @Column({
    type: 'varchar',
    nullable: true
  })
  modelRequestId?: string

  @Column({
    type: 'varchar',
    nullable: true
  })
  zipFilePath?: string

  @Column({
    type: 'enum',
    enum: ModelTrainingStatusEnum,
    default: ModelTrainingStatusEnum.IN_PROGRESS
  })
  trainingStatus: ModelTrainingStatusEnum = ModelTrainingStatusEnum.IN_PROGRESS

  @ManyToOne(() => User, (user) => user.outputImages)
  @JoinColumn({ name: 'userId' })
  user: User | undefined

  @Column({ name: 'user_id' })
  userId: number = 0

  @OneToMany(() => OutputImages, (OutputImages) => OutputImages.id)
  outputImages!: OutputImages[]
}
