import * as express from "express"
import ProjectController from "../controllers/ProjectController"

export const ProjectRouter = express.Router()
ProjectRouter.post("/project", ProjectController.CreateProject)
ProjectRouter.get("/projects", ProjectController.GetAllProject)
ProjectRouter.get("/project/:id", ProjectController.GetById)
ProjectRouter.delete("/project/:id", ProjectController.DeleteProject)
ProjectRouter.put("/project/:id", ProjectController.UpdateProject)
