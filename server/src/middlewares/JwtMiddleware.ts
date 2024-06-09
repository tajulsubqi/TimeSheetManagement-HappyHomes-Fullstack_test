import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import jwt from "jsonwebtoken"
import { UserEntity } from "../entity/User"

const UserRepository = AppDataSource.getRepository(UserEntity)

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ message: "No token provided" })
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    const user = await UserRepository.findOne({ where: { id: decoded.id } })
    if (!user) {
      return res.status(401).json({ message: "Invalid token" })
    }
    res.locals.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: "Failed to authenticate token" })
  }
}
