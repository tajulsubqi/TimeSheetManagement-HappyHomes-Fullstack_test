import { Repository } from "typeorm"
import { UserEntity } from "../entity/User"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

const dotenv = require("dotenv")
dotenv.config()

export default new (class UserServices {
  private readonly userRepository: Repository<UserEntity> =
    AppDataSource.getRepository(UserEntity)

  //Create User
  async createUser(req: Request, res: Response) {
    try {
      const { name, hourlyRate } = req.body
      if (!name || !hourlyRate) {
        return res.status(400).json({
          message: "Name and hourly rate are required",
        })
      }

      const user = this.userRepository.create({
        name,
        hourlyRate,
      })

      const payload = {
        id: user.id,
        name: user.name,
        hourlyRate: user.hourlyRate,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET!)

      const savedUser = await this.userRepository.save(user)
      return res.status(201).json({
        message: "User created successfully",
        data: savedUser,
        token,
      })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  // Find All Users
  async findAllUser(req: Request, res: Response) {
    try {
      const users = await this.userRepository.find()

      // Generate token for each user
      const usersWithToken = users.map((user) => {
        const payload = {
          id: user.id,
          name: user.name,
          hourlyRate: user.hourlyRate,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET!)
        return { ...user, token }
      })

      return res.status(200).json({ data: usersWithToken })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  //Find By Id
  async findUserById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const user = await this.userRepository.findOneBy({ id: Number(id) })
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        })
      }
      return res.status(200).json({
        message: "User retrieved successfully",
        data: user,
      })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  //Delete User
  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params
      const user = await this.userRepository.findOneBy({ id: Number(id) })
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        })
      }

      await this.userRepository.remove(user)
      return res.status(200).json({
        message: "User deleted successfully",
      })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  //Update User
  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { name, hourlyRate } = req.body
      const user = await this.userRepository.findOneBy({ id: Number(id) })
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        })
      }

      user.name = name
      user.hourlyRate = hourlyRate

      const updatedUser = await this.userRepository.save(user)
      return res.status(200).json({
        message: "User updated successfully",
        data: updatedUser,
      })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
})()
