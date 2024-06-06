import * as express from "express"
import { AppDataSource } from "./data-source"
import { UserRouter } from "./routes/UserRoute"

const cors = require("cors")
const port = 5000
const app = express()

AppDataSource.initialize()
  .then(async () => {
    app.use(express.json())
    app.use(cors())

    app.use("/api/v1", UserRouter)

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  })
  .catch((error) => console.log(error))
