import { Request, Response } from "express"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { ActivityEntity } from "../entity/Activity"
import { UserEntity } from "../entity/User"

export default new (class ActivityServices {
  private readonly activityRepository: Repository<ActivityEntity> =
    AppDataSource.getRepository(ActivityEntity)

  private readonly userRepository: Repository<UserEntity> =
    AppDataSource.getRepository(UserEntity)

  // Create activity
  async createActivity(req: Request, res: Response) {
    try {
      const { activityTitle, startDate, endDate, startTime, endTime, userId } = req.body

      const user = await this.userRepository.findOne({ where: { id: userId } })
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      const startTimeDate = new Date(`${startDate} ${startTime}`)
      const endTimeDate = new Date(`${endDate} ${endTime}`)

      const duration = (endTimeDate.getTime() - startTimeDate.getTime()) / (1000 * 60) // Durasi dalam menit

      if (duration < 0) {
        return res.status(400).json({ message: "Invalid time range" })
      }

      const totalIncome = (duration / 60) * user.hourlyRate // Pendapatan total berdasarkan hourlyRate user

      const activity = new ActivityEntity()
      activity.activityTitle = activityTitle
      activity.startDate = new Date(startDate)
      activity.endDate = new Date(endDate)
      activity.startTime = startTime
      activity.endTime = endTime
      activity.duration = duration
      activity.totalIncome = totalIncome
      activity.user = user // Set user relationship

      const savedActivity = await this.activityRepository.save(activity)
      return res.status(201).json({
        message: "Activity created successfully",
        data: savedActivity,
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Failed to create activity",
      })
    }
  }

  // Find all activities
  async findAllActivity(req: Request, res: Response) {
    try {
      const activities = await this.activityRepository.find({
        relations: ["proyek", "user"],
      })
      return res.status(200).json({
        message: "Activities retrieved successfully",
        data: activities,
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
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
        relations: ["proyek", "user"],
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
        error: error.message,
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
        relations: ["proyek", "user"],
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
        error: error.message,
        message: "Failed to delete activity",
      })
    }
  }

  // Update activity
  async updateActivity(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { activityTitle, startDate, endDate, startTime, endTime } = req.body
      const activity = await this.activityRepository.findOne({
        where: { id: Number(id) },
        relations: ["proyek", "user"],
      })
      if (!activity) {
        return res.status(404).json({
          message: "Activity not found",
        })
      }

      activity.activityTitle = activityTitle
      activity.startDate = new Date(startDate)
      activity.endDate = new Date(endDate)
      activity.startTime = startTime
      activity.endTime = endTime
      await this.activityRepository.save(activity)
      return res.status(200).json({
        message: "Activity updated successfully",
        data: activity,
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Failed to update activity",
      })
    }
  }
})()
