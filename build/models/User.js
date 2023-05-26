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
import Faculty from "./Faculty.js";
let User = class User {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({ name: "fullname" }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    Column({ name: "last_login" }),
    __metadata("design:type", Date)
], User.prototype, "lastLogin", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    Column({ name: "faculty_id" }),
    __metadata("design:type", Number)
], User.prototype, "facultyId", void 0);
__decorate([
    ManyToOne((type) => Faculty),
    JoinColumn({ name: "faculty_id" }),
    __metadata("design:type", Object)
], User.prototype, "faculty", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column({ name: "created_date" }),
    __metadata("design:type", Date)
], User.prototype, "createdDate", void 0);
__decorate([
    Column({ name: "updated_date" }),
    __metadata("design:type", Date)
], User.prototype, "updatedDate", void 0);
__decorate([
    ManyToMany((type) => Category),
    JoinTable({
        name: "user_categories",
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "category_id",
            referencedColumnName: "id",
        },
    }),
    __metadata("design:type", Array)
], User.prototype, "categories", void 0);
User = __decorate([
    Entity("users")
], User);
export default User;
//# sourceMappingURL=User.js.map