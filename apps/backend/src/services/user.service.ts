import { IUser } from 'common/dist/types'
import { UserRepository } from '../repositories/user.repository'

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.getAll()
  }

  async createOrUpdate(user: IUser): Promise<IUser> {
    return await this.userRepository.createOrUpdate(user)
  }
}
