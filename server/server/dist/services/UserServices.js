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
const User_1 = require("../entity/User");
const data_source_1 = require("../data-source");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = require("dotenv");
dotenv.config();
exports.default = new (class UserServices {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.UserEntity);
    }
    //Create User
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, hourlyRate } = req.body;
                if (!name || !hourlyRate) {
                    return res.status(400).json({
                        message: "Name and hourly rate are required",
                    });
                }
                const user = this.userRepository.create({
                    name,
                    hourlyRate,
                });
                const payload = {
                    id: user.id,
                    name: user.name,
                    hourlyRate: user.hourlyRate,
                };
                const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
                const savedUser = yield this.userRepository.save(user);
                return res.status(201).json({
                    message: "User created successfully",
                    data: savedUser,
                    token,
                });
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    // Find All Users
    findAllUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userRepository.find();
                // Generate token for each user
                const usersWithToken = users.map((user) => {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        hourlyRate: user.hourlyRate,
                    };
                    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
                    return Object.assign(Object.assign({}, user), { token });
                });
                return res.status(200).json({ data: usersWithToken });
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    //Find By Id
    findUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield this.userRepository.findOneBy({ id: Number(id) });
                if (!user) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                }
                return res.status(200).json({
                    message: "User retrieved successfully",
                    data: user,
                });
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    //Delete User
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield this.userRepository.findOneBy({ id: Number(id) });
                if (!user) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                }
                yield this.userRepository.remove(user);
                return res.status(200).json({
                    message: "User deleted successfully",
                });
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    //Update User
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, hourlyRate } = req.body;
                const user = yield this.userRepository.findOneBy({ id: Number(id) });
                if (!user) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                }
                user.name = name;
                user.hourlyRate = hourlyRate;
                const updatedUser = yield this.userRepository.save(user);
                return res.status(200).json({
                    message: "User updated successfully",
                    data: updatedUser,
                });
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
})();
