"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.AppDataSource = void 0
require("reflect-metadata")
const typeorm_1 = require("typeorm")
require("dotenv/config")
exports.AppDataSource = new typeorm_1.DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: ["dist/entity/**/*.js"],
  migrations: ["dist/migration/**/*.js"],
  subscribers: [],
})
