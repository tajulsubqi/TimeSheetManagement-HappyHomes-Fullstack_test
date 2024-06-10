import * as express from "express"
import UserController from "../controllers/UserController"

export const UserRouter = express.Router()
UserRouter.post("/user", UserController.AddUser)
UserRouter.get("/users", UserController.GetAllUser)
UserRouter.get("/user/:id", UserController.GetUserById)
UserRouter.delete("/user/:id", UserController.DeleteUser)
UserRouter.put("/user/:id", UserController.UpdateUser)
