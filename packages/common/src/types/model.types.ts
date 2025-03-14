import { ModelTrainingStatusEnum } from '@common/enums'
import { IOutPutImages } from './output-images.types'

export interface IModel {
  id: number
  userId: number
  name: string
  gender: string
  age: string
  ethnicity: string
  eyeColor: string
  bald: boolean
  triggerWord?: string
  tensorPath?: string
  thumbnailPath?: string
  trainingStatus: ModelTrainingStatusEnum
  modelRequestId?: string
  zipFilePath?: string
  outputImages: IOutPutImages[]
}
