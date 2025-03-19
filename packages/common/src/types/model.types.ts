import {
  EthnicityEnum,
  EyeColorEnum,
  GenderEnum,
  ModelTrainingStatusEnum
} from '@common/enums'
import { IOutPutImages } from './output-images.types'

export interface IModel {
  id: number
  userId: number | undefined
  name: string
  gender: GenderEnum
  age: string
  ethnicity: EthnicityEnum
  eyeColor: EyeColorEnum
  bald: boolean
  triggerWord?: string
  tensorPath?: string
  thumbnailPath?: string
  trainingStatus: ModelTrainingStatusEnum
  modelRequestId?: string
  zipFilePath?: string
  outputImages: IOutPutImages[]
}
