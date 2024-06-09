"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityRouter = void 0;
const express = __importStar(require("express"));
const ActivityControllers_1 = __importDefault(require("../controllers/ActivityControllers"));
const JwtMiddleware_1 = require("../middlewares/JwtMiddleware");
exports.ActivityRouter = express.Router();
exports.ActivityRouter.get("/export/csv", ActivityControllers_1.default.ExportToCSV);
exports.ActivityRouter.post("/activity", JwtMiddleware_1.verifyToken, ActivityControllers_1.default.AddActivity);
exports.ActivityRouter.get("/activities", JwtMiddleware_1.verifyToken, ActivityControllers_1.default.GetAllActivity);
exports.ActivityRouter.get("/activity/:id", JwtMiddleware_1.verifyToken, ActivityControllers_1.default.GetById);
exports.ActivityRouter.delete("/activity/:id", JwtMiddleware_1.verifyToken, ActivityControllers_1.default.DeleteActivity);
exports.ActivityRouter.put("/activity/:id", JwtMiddleware_1.verifyToken, ActivityControllers_1.default.UpdateActivity);
