import { OutputGeneratedStatusEnum } from '../enums'

export interface IOutPutImages {
  id: number
  modelId: string
  outputUrl: string
  prompt: string
  falAiRequestId?: string
  status: OutputGeneratedStatusEnum
  userId: number
}
