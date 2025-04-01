import { OutputGeneratedStatusEnum } from '../enums'

export interface IOutPutImages {
  id: number
  modelId: number
  outputUrl: string
  prompt: string
  falAiRequestId?: string
  status: OutputGeneratedStatusEnum
  userId: number
}
