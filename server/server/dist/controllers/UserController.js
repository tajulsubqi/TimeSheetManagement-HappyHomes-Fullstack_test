"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserServices_1 = __importDefault(require("../services/UserServices"));
exports.default = new (class UserController {
    AddUser(req, res) {
        UserServices_1.default.createUser(req, res);
    }
    GetAllUser(req, res) {
        UserServices_1.default.findAllUser(req, res);
    }
    GetUserById(req, res) {
        UserServices_1.default.findUserById(req, res);
    }
    DeleteUser(req, res) {
        UserServices_1.default.deleteUser(req, res);
    }
    UpdateUser(req, res) {
        UserServices_1.default.updateUser(req, res);
    }
})();
