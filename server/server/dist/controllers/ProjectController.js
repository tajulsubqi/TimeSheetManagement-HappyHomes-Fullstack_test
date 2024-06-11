"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectServices_1 = __importDefault(require("../services/ProjectServices"));
exports.default = new (class ProjectController {
    CreateProject(req, res) {
        ProjectServices_1.default.createProject(req, res);
    }
    GetAllProject(req, res) {
        ProjectServices_1.default.findAllProject(req, res);
    }
    GetById(req, res) {
        ProjectServices_1.default.findProjectById(req, res);
    }
    DeleteProject(req, res) {
        ProjectServices_1.default.deleteProject(req, res);
    }
    UpdateProject(req, res) {
        ProjectServices_1.default.updateProject(req, res);
    }
})();
