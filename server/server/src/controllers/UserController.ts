import { Request, Response } from "express"
import UserServices from "../services/UserServices"

export default new (class UserController {
  AddUser(req: Request, res: Response) {
    UserServices.createUser(req, res)
  }

  GetAllUser(req: Request, res: Response) {
    UserServices.findAllUser(req, res)
  }

  GetUserById(req: Request, res: Response) {
    UserServices.findUserById(req, res)
  }

  DeleteUser(req: Request, res: Response) {
    UserServices.deleteUser(req, res)
  }

  UpdateUser(req: Request, res: Response) {
    UserServices.updateUser(req, res)
  }
})()
