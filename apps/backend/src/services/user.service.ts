import { IUser } from "@common/types";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
    private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.getAll();
  }
}
