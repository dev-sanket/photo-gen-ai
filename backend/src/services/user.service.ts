import { IUser } from '../types'
import { UserRepository } from '../repositories/user.repository'
import { ResourceNotFoundError } from '../utils/errors/error-types'

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.getAll()
  }

  async getUserByClerkId(userId: string): Promise<IUser> {
    const user = await this.userRepository.getByClerkId(userId)
    if (!user) {
      throw new ResourceNotFoundError('User', userId)
    }
    return user
  }

  async createOrUpdate(user: IUser): Promise<IUser> {
    return await this.userRepository.createOrUpdate(user)
  }
}
