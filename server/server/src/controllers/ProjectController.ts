import { Request, Response } from "express"
import ProjectServices from "../services/ProjectServices"

export default new (class ProjectController {
  CreateProject(req: Request, res: Response) {
    ProjectServices.createProject(req, res)
  }

  GetAllProject(req: Request, res: Response) {
    ProjectServices.findAllProject(req, res)
  }

  GetById(req: Request, res: Response) {
    ProjectServices.findProjectById(req, res)
  }

  DeleteProject(req: Request, res: Response) {
    ProjectServices.deleteProject(req, res)
  }

  UpdateProject(req: Request, res: Response) {
    ProjectServices.updateProject(req, res)
  }
})()
