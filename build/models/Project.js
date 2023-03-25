var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, } from "typeorm";
import Category from "./Category.js";
import User from "./User.js";
let Project = class Project {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Project.prototype, "id", void 0);
__decorate([
    Column({ name: "creator_user_id" }),
    __metadata("design:type", Number)
], Project.prototype, "creatorUserId", void 0);
__decorate([
    ManyToOne((type) => User),
    JoinColumn({ name: "creator_user_id" }),
    __metadata("design:type", Object)
], Project.prototype, "user", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Project.prototype, "contacts", void 0);
__decorate([
    Column({ name: "is_closed" }),
    __metadata("design:type", Boolean)
], Project.prototype, "isClosed", void 0);
__decorate([
    Column({ name: "created_date" }),
    __metadata("design:type", Date)
], Project.prototype, "createdDate", void 0);
__decorate([
    Column({ name: "updated_date" }),
    __metadata("design:type", Date)
], Project.prototype, "updatedDate", void 0);
__decorate([
    Column({ name: "start_date" }),
    __metadata("design:type", Date)
], Project.prototype, "startDate", void 0);
__decorate([
    Column({ name: "end_date" }),
    __metadata("design:type", Date)
], Project.prototype, "endDate", void 0);
__decorate([
    Column({ name: "application_deadline" }),
    __metadata("design:type", Date)
], Project.prototype, "applicationDeadline", void 0);
__decorate([
    Column({ name: "employment_type" }),
    __metadata("design:type", Number)
], Project.prototype, "employmentType", void 0);
__decorate([
    Column({ name: "territory" }),
    __metadata("design:type", String)
], Project.prototype, "territory", void 0);
__decorate([
    Column({ name: "skills" }),
    __metadata("design:type", String)
], Project.prototype, "skills", void 0);
__decorate([
    Column({ name: "credit_number" }),
    __metadata("design:type", Number)
], Project.prototype, "creditNumber", void 0);
__decorate([
    Column({ name: "campus" }),
    __metadata("design:type", Number)
], Project.prototype, "campus", void 0);
__decorate([
    Column({ name: "participants_number" }),
    __metadata("design:type", Number)
], Project.prototype, "participantsNumber", void 0);
__decorate([
    Column({ name: "project_type" }),
    __metadata("design:type", Number)
], Project.prototype, "projectType", void 0);
__decorate([
    Column({ name: "weekly_hours" }),
    __metadata("design:type", Number)
], Project.prototype, "weeklyHours", void 0);
__decorate([
    ManyToMany((type) => Category),
    JoinTable({
        name: "project_categories",
        joinColumn: {
            name: "project_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "category_id",
            referencedColumnName: "id",
        },
    }),
    __metadata("design:type", Array)
], Project.prototype, "categories", void 0);
Project = __decorate([
    Entity("projects")
], Project);
export default Project;
//# sourceMappingURL=Project.js.map