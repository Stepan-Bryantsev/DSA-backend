import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Relation,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Category from "./Category.js";
import User from "./User.js";

@Entity("projects")
export default class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "creator_user_id" })
  creatorUserId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: "creator_user_id" })
  user: Relation<User>;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  contacts: string;

  @Column({ name: "is_closed" })
  isClosed: Boolean;

  @Column({ name: "created_date" })
  createdDate: Date;

  @Column({ name: "updated_date" })
  updatedDate: Date;

  @Column({ name: "start_date" })
  startDate: Date;

  @Column({ name: "end_date" })
  endDate: Date;

  @Column({ name: "application_deadline" })
  applicationDeadline: Date;

  @Column({ name: "employment_type" })
  employmentType: Number;

  @Column({ name: "territory" })
  territory: String;

  @Column({ name: "skills" })
  skills: String;

  @Column({ name: "credit_number" })
  creditNumber: Number;

  @Column({ name: "campus" })
  campus: Number;

  @Column({ name: "participants_number" })
  participantsNumber: Number;

  @Column({ name: "project_type" })
  projectType: Number;

  @Column({ name: "weekly_hours" })
  weeklyHours: Number;

  @ManyToMany((type) => Category)
  @JoinTable({
    name: "project_categories",
    joinColumn: {
      name: "project_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "category_id",
      referencedColumnName: "id",
    },
  })
  categories: Category[];
}
