import { ModelService } from '../services/model.service'

export class ModelController {
  private userService: ModelService

  constructor() {
    this.userService = new ModelService()
  }
  async createPresignedUrl(): Promise<string> {
    return ''
  }
}
