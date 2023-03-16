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
let Recommendation = class Recommendation {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Recommendation.prototype, "id", void 0);
__decorate([
    Column({ name: "user_id" }),
    __metadata("design:type", Number)
], Recommendation.prototype, "userId", void 0);
__decorate([
    Column({ name: "project_id" }),
    __metadata("design:type", Number)
], Recommendation.prototype, "projectId", void 0);
__decorate([
    ManyToOne((type) => User),
    JoinColumn({ name: "user_id" }),
    __metadata("design:type", Object)
], Recommendation.prototype, "user", void 0);
__decorate([
    ManyToOne((type) => Project),
    JoinColumn({ name: "project_id" }),
    __metadata("design:type", Object)
], Recommendation.prototype, "project", void 0);
Recommendation = __decorate([
    Entity("user_recommendations")
], Recommendation);
export default Recommendation;
//# sourceMappingURL=Recommendation.js.map