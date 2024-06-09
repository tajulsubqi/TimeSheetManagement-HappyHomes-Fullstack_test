import { Repository } from "typeorm"
import { ProjectEntity } from "../entity/Project"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { ActivityEntity } from "../entity/Activity"

export default new (class ProjectServices {
  private readonly projectRepository: Repository<ProjectEntity> =
    AppDataSource.getRepository(ProjectEntity)
  private readonly activityRepository: Repository<ActivityEntity> =
    AppDataSource.getRepository(ActivityEntity)

  // Create Project
  async createProject(req: Request, res: Response) {
    try {
      const { projectName, activities } = req.body
      if (!projectName) {
        return res.status(400).json({
          message: "Project name is required",
        })
      }

      const project = this.projectRepository.create({
        projectName,
      })

      if (activities && Array.isArray(activities)) {
        project.activities = activities.map((activityData: any) => {
          const activity = new ActivityEntity()
          activity.activityTitle = activityData.activityTitle
          activity.startDate = activityData.startDate
          activity.endDate = activityData.endDate
          return activity
        })
      }

      const savedProject = await this.projectRepository.save(project)
      return res.status(201).json({
        message: "Project created successfully",
        data: savedProject,
      })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  // Find All Projects
  async findAllProject(req: Request, res: Response) {
    try {
      const projects = await this.projectRepository.find({ relations: ["activities"] })
      return res.status(200).json({
        message: "Projects retrieved successfully",
        data: projects,
      })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  // Find Project By Id
  async findProjectById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const project = await this.projectRepository.findOne({
        where: { id: Number(id) },
        relations: ["activities"],
      })
      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        })
      }
      return res.status(200).json({
        message: "Project retrieved successfully",
        data: project,
      })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  // Delete Project
  async deleteProject(req: Request, res: Response) {
    try {
      const { id } = req.params
      const project = await this.projectRepository.findOne({ where: { id: Number(id) } })
      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        })
      }
      await this.projectRepository.remove(project)
      return res.status(200).json({
        message: "Project deleted successfully",
      })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  // Update Project
  async updateProject(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { projectName, activities } = req.body
      if (!projectName) {
        return res.status(400).json({
          message: "Project name is required",
        })
      }
      const project = await this.projectRepository.findOne({
        where: { id: Number(id) },
        relations: ["activities"],
      })
      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        })
      }
      project.projectName = projectName

      if (activities && Array.isArray(activities)) {
        project.activities = activities.map((activityData: any) => {
          const activity = new ActivityEntity()
          activity.activityTitle = activityData.activityTitle
          activity.startDate = activityData.startDate
          activity.endDate = activityData.endDate
          return activity
        })
      }

      const updatedProject = await this.projectRepository.save(project)
      return res.status(200).json({
        message: "Project updated successfully",
        data: updatedProject,
      })
    } catch (error) {
      return res.status(500).json({
        message: "Update project failed",
        error: error.message,
      })
    }
  }
})()
