import * as express from "express"
import UserController from "../controllers/UserController"

export const UserRouter = express.Router()
UserRouter.post("/user", UserController.User)
UserRouter.get("/users", UserController.GetAllUser)
UserRouter.get("/user/:id", UserController.GetUserById)
