import { Request, Response } from "express"
import ActivityServices from "../services/ActivityServices"

export default new (class ActivityController {
  AddActivity(req: Request, res: Response) {
    ActivityServices.createActivity(req, res)
  }

  GetAllActivity(req: Request, res: Response) {
    ActivityServices.findAllActivity(req, res)
  }

  GetById(req: Request, res: Response) {
    ActivityServices.findActivityById(req, res)
  }

  DeleteActivity(req: Request, res: Response) {
    ActivityServices.deleteActivity(req, res)
  }

  UpdateActivity(req: Request, res: Response) {
    ActivityServices.updateActivity(req, res)
  }
})()
