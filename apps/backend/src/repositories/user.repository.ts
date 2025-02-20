import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { User } from "../entities/user.entity";

export class UserRepository {
    private userRepo: Repository<User>;

    constructor() {
        this.userRepo = AppDataSource.getRepository(User);
      }
      async getAll(): Promise<User[]> {
        return this.userRepo.find();
      }
    
      async getById(id: number): Promise<User | null> {
        return this.userRepo.findOneBy({ id });
      }
    
      async create(user: Partial<User>): Promise<User> {
        const newUser = this.userRepo.create(user);
        return this.userRepo.save(newUser);
      }
    
}
