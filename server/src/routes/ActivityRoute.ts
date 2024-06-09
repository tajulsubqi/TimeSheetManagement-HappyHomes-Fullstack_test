import * as express from "express"
import ActivityController from "../controllers/ActivityControllers"
import { verifyToken } from "../middlewares/JwtMiddleware"

export const ActivityRouter = express.Router()
ActivityRouter.get("/export", ActivityController.ExportToCSV)
ActivityRouter.post("/activity", verifyToken, ActivityController.AddActivity)
ActivityRouter.get("/activities", verifyToken, ActivityController.GetAllActivity)
ActivityRouter.get("/activity/:id", verifyToken, ActivityController.GetById)
ActivityRouter.delete("/activity/:id", verifyToken, ActivityController.DeleteActivity)
ActivityRouter.put("/activity/:id", verifyToken, ActivityController.UpdateActivity)
