import { Request, Response } from "express"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { ActivityEntity } from "../entity/Activity"
import { UserEntity } from "../entity/User"
import { ProjectEntity } from "../entity/Project"
import { Parser } from "json2csv"

export default new (class ActivityServices {
  private readonly activityRepository: Repository<ActivityEntity> =
    AppDataSource.getRepository(ActivityEntity)
  private readonly userRepository: Repository<UserEntity> =
    AppDataSource.getRepository(UserEntity)
  private readonly projectRepository: Repository<ProjectEntity> =
    AppDataSource.getRepository(ProjectEntity)

  async exportToCSV(req: Request, res: Response) {
    try {
      const activities = await this.activityRepository.find({
        relations: ["user", "project"],
      })

      const csvRows = activities.map((activity) => {
        return {
          id: activity.id,
          activityTitle: activity.activityTitle || "",
          startDate: activity.startDate
            ? activity.startDate.toISOString().split("T")[0]
            : "",
          endDate: activity.endDate ? activity.endDate.toISOString().split("T")[0] : "",
          startTime: activity.startTime || "",
          endTime: activity.endTime || "",
          duration: activity.duration || 0,
          totalIncome: activity.totalIncome || 0,
          user: activity.user ? activity.user.name : "",
          project: activity.project ? activity.project.projectName : "",
        }
      })

      const json2csvParser = new Parser()
      const csv = json2csvParser.parse(csvRows)

      res.setHeader("Content-Type", "text/csv")
      res.setHeader("Content-Disposition", "attachment; filename=activities.csv")
      res.send(csv)
    } catch (error) {
      return res.status(500).json({
        message: "Failed to export activities to CSV",
        error: error,
      })
    }
  }

  // Create activity
  async createActivity(req: Request, res: Response) {
    try {
      const { activityTitle, startDate, endDate, startTime, endTime, userId, projectId } =
        req.body

      const user = await this.userRepository.findOne({ where: { id: userId } })
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      const project = await this.projectRepository.findOne({ where: { id: projectId } })
      if (!project) {
        return res.status(404).json({ message: "Project not found" })
      }

      const startTimeDate = new Date(`${startDate} ${startTime}`)
      const endTimeDate = new Date(`${endDate} ${endTime}`)

      const duration = endTimeDate.getTime() - startTimeDate.getTime()
      if (duration < 0) {
        return res.status(400).json({ message: "Invalid time range" })
      }

      // Hitung Total Income
      const totalIncome = Math.round((duration / (1000 * 60 * 60)) * user.hourlyRate) // Durasi dalam jam

      const activity = this.activityRepository.create({
        activityTitle,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        startTime,
        endTime,
        duration,
        totalIncome,
        project,
        user,
      })

      const savedActivity = await this.activityRepository.save(activity)
      return res.status(201).json({
        message: "Activity created successfully",
        data: savedActivity,
      })
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: "Failed to create activity",
      })
    }
  }

  // Find all activities
  async findAllActivity(req: Request, res: Response) {
    try {
      const activities = await this.activityRepository.find({
        relations: ["project", "user"],
      })
      return res.status(200).json({
        message: "Activities retrieved successfully",
        data: activities,
      })
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: "Failed to retrieve activities",
      })
    }
  }

  // Find activity by id
  async findActivityById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const activity = await this.activityRepository.findOne({
        where: { id: Number(id) },
        relations: ["project", "user"],
      })
      if (!activity) {
        return res.status(404).json({
          message: "Activity not found",
        })
      }
      return res.status(200).json({
        message: "Activity retrieved successfully",
        data: activity,
      })
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: "Failed to retrieve activity",
      })
    }
  }

  // Delete activity
  async deleteActivity(req: Request, res: Response) {
    try {
      const { id } = req.params
      const activity = await this.activityRepository.findOne({
        where: { id: Number(id) },
        relations: ["project", "user"],
      })
      if (!activity) {
        return res.status(404).json({
          message: "Activity not found",
        })
      }
      await this.activityRepository.remove(activity)
      return res.status(200).json({
        message: "Activity deleted successfully",
      })
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: "Failed to delete activity",
      })
    }
  }

  // Update activity
  async updateActivity(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { activityTitle, startDate, endDate, startTime, endTime, projectId, userId } =
        req.body

      const activity = await this.activityRepository.findOne({
        where: { id: Number(id) },
        relations: ["project", "user"],
      })
      if (!activity) {
        return res.status(404).json({
          message: "Activity not found",
        })
      }

      const user = await this.userRepository.findOne({ where: { id: userId } })
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      const project = await this.projectRepository.findOne({ where: { id: projectId } })
      if (!project) {
        return res.status(404).json({ message: "Project not found" })
      }

      activity.activityTitle = activityTitle
      activity.startDate = new Date(startDate)
      activity.endDate = new Date(endDate)
      activity.startTime = startTime
      activity.endTime = endTime
      activity.user = user
      activity.project = project

      await this.activityRepository.save(activity)
      return res.status(200).json({
        message: "Activity updated successfully",
        data: activity,
      })
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: "Failed to update activity",
      })
    }
  }
})()
