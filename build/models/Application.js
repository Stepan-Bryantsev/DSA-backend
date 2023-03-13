var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, } from "typeorm";
import Project from "./Project.js";
import User from "./User.js";
let Application = class Application {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Application.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Application.prototype, "project_id", void 0);
__decorate([
    ManyToOne((type) => Project),
    JoinColumn({ name: "project_id" }),
    __metadata("design:type", Object)
], Application.prototype, "project", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Application.prototype, "applicant_id", void 0);
__decorate([
    ManyToOne((type) => User),
    JoinColumn({ name: "applicant_id" }),
    __metadata("design:type", Object)
], Application.prototype, "applicant", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], Application.prototype, "created_date", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Application.prototype, "message", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Application.prototype, "status", void 0);
Application = __decorate([
    Entity("applications")
], Application);
export default Application;
//# sourceMappingURL=Application.js.map