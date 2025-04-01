import { Entity, Column, OneToMany } from 'typeorm'
import { BaseModel } from './base.entity'
import { OutputImages } from './output-image.entity'
import { Model } from './model.entity'
import { IUser } from '../types'

@Entity({ name: 'users' })
export class User extends BaseModel implements IUser {
  @Column({ unique: true, nullable: false })
  clerkId: string = ''

  @Column()
  name: string = ''

  @Column({ unique: true, nullable: false })
  email: string = ''

  @Column({ type: 'varchar', nullable: true })
  profilePicture?: string | undefined

  @Column({ type: 'numeric', default: 0 })
  trainedModelCount!: number

  @OneToMany(() => OutputImages, (OutputImages) => OutputImages.user)
  outputImages!: OutputImages[]

  @OneToMany(() => Model, (Model) => Model.user)
  models!: Model[]
}
