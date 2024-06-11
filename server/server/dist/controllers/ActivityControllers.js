"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActivityServices_1 = __importDefault(require("../services/ActivityServices"));
exports.default = new (class ActivityController {
    ExportToCSV(req, res) {
        ActivityServices_1.default.exportToCSV(req, res);
    }
    AddActivity(req, res) {
        ActivityServices_1.default.createActivity(req, res);
    }
    GetAllActivity(req, res) {
        ActivityServices_1.default.findAllActivity(req, res);
    }
    GetById(req, res) {
        ActivityServices_1.default.findActivityById(req, res);
    }
    DeleteActivity(req, res) {
        ActivityServices_1.default.deleteActivity(req, res);
    }
    UpdateActivity(req, res) {
        ActivityServices_1.default.updateActivity(req, res);
    }
})();
