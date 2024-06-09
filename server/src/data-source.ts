import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "timesheet",
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.ts"],
  migrations: ["src/migration/*.ts"],
  subscribers: [],
  ssl: {
    ca: "/path/to/ca.pem",
    cert: "/path/to/client-cert.pem",
    key: "/path/to/client-key.pem",
  },
})
