"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const UserRoute_1 = require("./routes/UserRoute");
const ActivityRoute_1 = require("./routes/ActivityRoute");
const ProjectRoute_1 = require("./routes/ProjectRoute");
const cors = require("cors");
const port = 5000;
const app = (0, express_1.default)();
const dotenv = require("dotenv");
dotenv.config();
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express_1.default.json());
    app.use(cors());
    app.use("/api/v1", UserRoute_1.UserRouter);
    app.use("/api/v1", ActivityRoute_1.ActivityRouter);
    app.use("/api/v1", ProjectRoute_1.ProjectRouter);
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}))
    .catch((error) => console.log(error));
