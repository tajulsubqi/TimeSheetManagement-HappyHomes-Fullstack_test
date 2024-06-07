import { Repository } from "typeorm"
import { ProjectEntity } from "../entity/Project"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"

export default new (class ProjectServices {
  private readonly projectRepository: Repository<ProjectEntity> =
    AppDataSource.getRepository(ProjectEntity)

  //Create Project
  async createProject(req: Request, res: Response) {
    try {
      const { projectName } = req.body
      if (!projectName) {
        return res.status(400).json({
          message: "Project name is required",
        })
      }

      const project = new ProjectEntity()
      project.projectName = projectName

      const savedProject = await this.projectRepository.save(project)
      return res.status(201).json({
        message: "Project created successfully",
        data: savedProject,
      })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  //Find All
  async findAllProject(req: Request, res: Response) {
    try {
      const projects = await this.projectRepository.find()
      return res.status(200).json({
        message: "Projects retrieved successfully",
        data: projects,
      })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  //Find By Id
  async findProjectById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const project = await this.projectRepository.findOneBy({ id: Number(id) })
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
      const project = await this.projectRepository.findOneBy({ id: Number(id) })
      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        })
      }
      await this.projectRepository.delete(Number(id))
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
      const { projectName } = req.body
      if (!projectName) {
        return res.status(400).json({
          message: "Project name is required",
        })
      }
      const project = await this.projectRepository.findOneBy({ id: Number(id) })
      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        })
      }
      project.projectName = projectName
      const updatedProject = await this.projectRepository.save(project)
      return res.status(200).json({
        message: "Project updated successfully",
        data: updatedProject,
      })
    } catch (error) {
      return res.status(500).json({
        message: "Upadete project failed",
        error: error.message,
      })
    }
  }
})()
