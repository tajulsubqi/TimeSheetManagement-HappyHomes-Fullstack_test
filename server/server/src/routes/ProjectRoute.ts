import * as express from "express"
import ProjectController from "../controllers/ProjectController"
import { verifyToken } from "../middlewares/JwtMiddleware"

export const ProjectRouter = express.Router()
ProjectRouter.post("/project", verifyToken, ProjectController.CreateProject)
ProjectRouter.get("/projects", verifyToken, ProjectController.GetAllProject)
ProjectRouter.get("/project/:id", verifyToken, ProjectController.GetById)
ProjectRouter.delete("/project/:id", verifyToken, ProjectController.DeleteProject)
ProjectRouter.put("/project/:id", verifyToken, ProjectController.UpdateProject)
