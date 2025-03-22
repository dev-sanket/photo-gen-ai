import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { ApiResponse, IUser } from '../types'

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  getAllUsers = async (
    req: Request,
    res: Response
  ): Promise<ApiResponse<IUser[]>> => {
    const users = await this.userService.getAllUsers()
    return { data: users, message: 'Success', status: 200 }
  }

  getUserById = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id)
    // const user = this.userService.getUserById(id);
    // if (!user) {
    //   res.status(404).json({ message: "User not found" });
    // } else {
    // }
    res.json({ user: '' })
  }

  createUser = (req: Request, res: Response): void => {
    const newUser = req.body
    // const user = this.userService.createUser(newUser);
    res.status(201).json({ user: '' })
  }
}
