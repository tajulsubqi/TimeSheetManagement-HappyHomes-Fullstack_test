"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityEntity = void 0;
const typeorm_1 = require("typeorm");
const Project_1 = require("./Project");
const User_1 = require("./User");
let ActivityEntity = class ActivityEntity {
};
exports.ActivityEntity = ActivityEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], ActivityEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)()
], ActivityEntity.prototype, "activityTitle", void 0);
__decorate([
    (0, typeorm_1.Column)()
], ActivityEntity.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)()
], ActivityEntity.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" })
], ActivityEntity.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" })
], ActivityEntity.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 })
], ActivityEntity.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 })
], ActivityEntity.prototype, "totalIncome", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)()
], ActivityEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)()
], ActivityEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Project_1.ProjectEntity, (project) => project.activities),
    (0, typeorm_1.JoinColumn)({ name: "project_id" })
], ActivityEntity.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.UserEntity, (user) => user.activities),
    (0, typeorm_1.JoinColumn)({ name: "user_id" })
], ActivityEntity.prototype, "user", void 0);
exports.ActivityEntity = ActivityEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "activities" })
], ActivityEntity);
