import * as express from "express"
import ActivityController from "../controllers/ActivityControllers"

export const ActivityRouter = express.Router()
ActivityRouter.post("/activity", ActivityController.AddActivity)
ActivityRouter.get("/activities", ActivityController.GetAllActivity)
ActivityRouter.get("/activity/:id", ActivityController.GetById)
ActivityRouter.delete("/activity/:id", ActivityController.DeleteActivity)
ActivityRouter.put("/activity/:id", ActivityController.UpdateActivity)
