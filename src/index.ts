import express from "express"
import { AppDataSource } from "./data-source"
import { UserRouter } from "./routes/UserRoute"
import { ActivityRouter } from "./routes/ActivityRoute"
import { ProjectRouter } from "./routes/ProjectRoute"
import "reflect-metadata"
import "dotenv/config"

const cors = require("cors")
const port = process.env.PORT || 5000
const app = express()
const dotenv = require("dotenv")

dotenv.config()

AppDataSource.initialize()
  .then(async () => {
    app.use(express.json())
    app.use(cors())

    app.use("/api/v1", UserRouter)
    app.use("/api/v1", ActivityRouter)
    app.use("/api/v1", ProjectRouter)

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  })
  .catch((error) => console.log(error))
