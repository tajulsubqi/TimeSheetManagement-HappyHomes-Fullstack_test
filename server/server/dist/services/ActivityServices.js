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
const data_source_1 = require("../data-source");
const Activity_1 = require("../entity/Activity");
const User_1 = require("../entity/User");
const Project_1 = require("../entity/Project");
const json2csv_1 = require("json2csv");
exports.default = new (class ActivityServices {
    constructor() {
        this.activityRepository = data_source_1.AppDataSource.getRepository(Activity_1.ActivityEntity);
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.UserEntity);
        this.projectRepository = data_source_1.AppDataSource.getRepository(Project_1.ProjectEntity);
    }
    exportToCSV(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activities = yield this.activityRepository.find({
                    relations: ["user", "project"],
                });
                const csvRows = activities.map((activity) => {
                    return {
                        id: activity.id,
                        activityTitle: activity.activityTitle || "",
                        startDate: activity.startDate
                            ? activity.startDate.toISOString().split("T")[0]
                            : "",
                        endDate: activity.endDate ? activity.endDate.toISOString().split("T")[0] : "",
                        startTime: activity.startTime || "",
                        endTime: activity.endTime || "",
                        duration: activity.duration || 0,
                        totalIncome: activity.totalIncome || 0,
                        user: activity.user ? activity.user.name : "",
                        project: activity.project ? activity.project.projectName : "",
                    };
                });
                const json2csvParser = new json2csv_1.Parser();
                const csv = json2csvParser.parse(csvRows);
                res.setHeader("Content-Type", "text/csv");
                res.setHeader("Content-Disposition", "attachment; filename=activities.csv");
                res.send(csv);
            }
            catch (error) {
                return res.status(500).json({
                    message: "Failed to export activities to CSV",
                    error: error,
                });
            }
        });
    }
    // Create activity
    createActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { activityTitle, startDate, endDate, startTime, endTime, userId, projectId } = req.body;
                const user = yield this.userRepository.findOne({ where: { id: userId } });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                const project = yield this.projectRepository.findOne({ where: { id: projectId } });
                if (!project) {
                    return res.status(404).json({ message: "Project not found" });
                }
                const startTimeDate = new Date(`${startDate} ${startTime}`);
                const endTimeDate = new Date(`${endDate} ${endTime}`);
                const duration = endTimeDate.getTime() - startTimeDate.getTime();
                if (duration < 0) {
                    return res.status(400).json({ message: "Invalid time range" });
                }
                // Hitung Total Income
                const totalIncome = Math.round((duration / (1000 * 60 * 60)) * user.hourlyRate); // Durasi dalam jam
                const activity = this.activityRepository.create({
                    activityTitle,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    startTime,
                    endTime,
                    duration,
                    totalIncome,
                    project,
                    user,
                });
                const savedActivity = yield this.activityRepository.save(activity);
                return res.status(201).json({
                    message: "Activity created successfully",
                    data: savedActivity,
                });
            }
            catch (error) {
                return res.status(500).json({
                    error: error,
                    message: "Failed to create activity",
                });
            }
        });
    }
    // Find all activities
    findAllActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activities = yield this.activityRepository.find({
                    relations: ["project", "user"],
                });
                return res.status(200).json({
                    message: "Activities retrieved successfully",
                    data: activities,
                });
            }
            catch (error) {
                return res.status(500).json({
                    error: error,
                    message: "Failed to retrieve activities",
                });
            }
        });
    }
    // Find activity by id
    findActivityById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const activity = yield this.activityRepository.findOne({
                    where: { id: Number(id) },
                    relations: ["project", "user"],
                });
                if (!activity) {
                    return res.status(404).json({
                        message: "Activity not found",
                    });
                }
                return res.status(200).json({
                    message: "Activity retrieved successfully",
                    data: activity,
                });
            }
            catch (error) {
                return res.status(500).json({
                    error: error,
                    message: "Failed to retrieve activity",
                });
            }
        });
    }
    // Delete activity
    deleteActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const activity = yield this.activityRepository.findOne({
                    where: { id: Number(id) },
                    relations: ["project", "user"],
                });
                if (!activity) {
                    return res.status(404).json({
                        message: "Activity not found",
                    });
                }
                yield this.activityRepository.remove(activity);
                return res.status(200).json({
                    message: "Activity deleted successfully",
                });
            }
            catch (error) {
                return res.status(500).json({
                    error: error,
                    message: "Failed to delete activity",
                });
            }
        });
    }
    // Update activity
    updateActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { activityTitle, startDate, endDate, startTime, endTime, projectId, userId } = req.body;
                const activity = yield this.activityRepository.findOne({
                    where: { id: Number(id) },
                    relations: ["project", "user"],
                });
                if (!activity) {
                    return res.status(404).json({
                        message: "Activity not found",
                    });
                }
                const user = yield this.userRepository.findOne({ where: { id: userId } });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                const project = yield this.projectRepository.findOne({ where: { id: projectId } });
                if (!project) {
                    return res.status(404).json({ message: "Project not found" });
                }
                activity.activityTitle = activityTitle;
                activity.startDate = new Date(startDate);
                activity.endDate = new Date(endDate);
                activity.startTime = startTime;
                activity.endTime = endTime;
                activity.user = user;
                activity.project = project;
                yield this.activityRepository.save(activity);
                return res.status(200).json({
                    message: "Activity updated successfully",
                    data: activity,
                });
            }
            catch (error) {
                return res.status(500).json({
                    error: error,
                    message: "Failed to update activity",
                });
            }
        });
    }
})();
