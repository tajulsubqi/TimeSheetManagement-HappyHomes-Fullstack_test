"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.AppDataSource = void 0
require("reflect-metadata")
const typeorm_1 = require("typeorm")
exports.AppDataSource = new typeorm_1.DataSource({
  type: "postgres",
  host: "monorail.proxy.rlwy.net",
  port: 25114,
  username: "postgres",
  password: "OoNabkeECEAgiiOomFzTyjzSjpNGiGPn",
  database: "railway",
  synchronize: false,
  logging: false,
  entities: ["dist/entity/**/*.js"],
  migrations: ["dist/migration/**/*.js"],
  subscribers: [],
})
