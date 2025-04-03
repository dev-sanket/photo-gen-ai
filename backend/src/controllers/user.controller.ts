import { Request, Response } from 'express'
import { UserService } from '../services'
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

  getUserById = async (
    req: Request,
    res: Response
  ): Promise<ApiResponse<IUser>> => {
    const id = req.params.id
    const user = await this.userService.getUserByClerkId(id)
    return { data: user, message: 'Success', status: 200 }
  }

  // createUser = (req: Request, res: Response): void => {
  //   const newUser = req.body
  //   // const user = this.userService.createUser(newUser);
  //   res.status(201).json({ user: '' })
  // }
}
