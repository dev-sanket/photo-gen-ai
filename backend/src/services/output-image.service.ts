import { AppDataSource } from '../config/database'
import { OutputImagesRepository, UserRepository } from '../repositories'
import { errorTypes } from '../utils'
import { IOutPutImages } from '../types'

const { ResourceNotFoundError } = errorTypes

export class OutputImagesService {
  outputImagesRepository: OutputImagesRepository
  userRepository: UserRepository
  constructor() {
    this.outputImagesRepository = new OutputImagesRepository(AppDataSource)
    this.userRepository = new UserRepository()
  }

  async createOutputImage(
    outputImage: IOutPutImages,
    userId: string
  ): Promise<IOutPutImages> {
    const user = await this.userRepository.getByClerkId(userId)
    if (!user) {
      throw new ResourceNotFoundError('User', userId)
    }
    const newOutputImage: IOutPutImages = {
      ...outputImage,
      userId: user.id
    }
    return await this.outputImagesRepository.create(newOutputImage)
  }

  async bulkCreateOutputImages(
    outputImages: IOutPutImages[],
    userId: string
  ): Promise<IOutPutImages[]> {
    const user = await this.userRepository.getByClerkId(userId)
    if (!user) {
      throw new ResourceNotFoundError('User', userId)
    }
    const newOutputImages: IOutPutImages[] = outputImages.map((outputImage) => {
      return {
        ...outputImage,
        userId: user.id
      }
    })
    return await this.outputImagesRepository.bulkCreate(newOutputImages)
  }

  async getAllOutputImagesByUserId(
    userId: string,
    skip: number = 0,
    limit: number = 10
  ): Promise<IOutPutImages[]> {
    const user = await this.userRepository.getByClerkId(userId)
    const outputImages = await this.outputImagesRepository.find(
      { userId: user?.id },
      {
        skip,
        take: limit,
        order: {
          createdAt: 'DESC'
        }
      }
    )
    return outputImages
  }
}
