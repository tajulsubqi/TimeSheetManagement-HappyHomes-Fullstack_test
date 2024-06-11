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
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = require("../entity/Project");
const data_source_1 = require("../data-source");
const Activity_1 = require("../entity/Activity");
exports.default = new (class ProjectServices {
    constructor() {
        this.projectRepository = data_source_1.AppDataSource.getRepository(Project_1.ProjectEntity);
        this.activityRepository = data_source_1.AppDataSource.getRepository(Activity_1.ActivityEntity);
    }
    // Create Project
    createProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectName, activities } = req.body;
                if (!projectName) {
                    return res.status(400).json({
                        message: "Project name is required",
                    });
                }
                const project = this.projectRepository.create({
                    projectName,
                });
                if (activities && Array.isArray(activities)) {
                    project.activities = activities.map((activityData) => {
                        const activity = new Activity_1.ActivityEntity();
                        activity.activityTitle = activityData.activityTitle;
                        activity.startDate = activityData.startDate;
                        activity.endDate = activityData.endDate;
                        return activity;
                    });
                }
                const savedProject = yield this.projectRepository.save(project);
                return res.status(201).json({
                    message: "Project created successfully",
                    data: savedProject,
                });
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    // Find All Projects
    findAllProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield this.projectRepository.find({ relations: ["activities"] });
                return res.status(200).json({
                    message: "Projects retrieved successfully",
                    data: projects,
                });
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    // Find Project By Id
    findProjectById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const project = yield this.projectRepository.findOne({
                    where: { id: Number(id) },
                    relations: ["activities"],
                });
                if (!project) {
                    return res.status(404).json({
                        message: "Project not found",
                    });
                }
                return res.status(200).json({
                    message: "Project retrieved successfully",
                    data: project,
                });
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    // Delete Project
    deleteProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const project = yield this.projectRepository.findOne({ where: { id: Number(id) } });
                if (!project) {
                    return res.status(404).json({
                        message: "Project not found",
                    });
                }
                yield this.projectRepository.remove(project);
                return res.status(200).json({
                    message: "Project deleted successfully",
                });
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    // Update Project
    updateProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { projectName, activities } = req.body;
                if (!projectName) {
                    return res.status(400).json({
                        message: "Project name is required",
                    });
                }
                const project = yield this.projectRepository.findOne({
                    where: { id: Number(id) },
                    relations: ["activities"],
                });
                if (!project) {
                    return res.status(404).json({
                        message: "Project not found",
                    });
                }
                project.projectName = projectName;
                if (activities && Array.isArray(activities)) {
                    project.activities = activities.map((activityData) => {
                        const activity = new Activity_1.ActivityEntity();
                        activity.activityTitle = activityData.activityTitle;
                        activity.startDate = activityData.startDate;
                        activity.endDate = activityData.endDate;
                        return activity;
                    });
                }
                const updatedProject = yield this.projectRepository.save(project);
                return res.status(200).json({
                    message: "Project updated successfully",
                    data: updatedProject,
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Update project failed",
                    error: error,
                });
            }
        });
    }
})();
