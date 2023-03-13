import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Relation,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Project from "./Project.js";
import User from "./User.js";

@Entity("applications")
export default class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("project_id")
  projectId: number;

  @ManyToOne((type) => Project)
  @JoinColumn({ name: "project_id" })
  project: Relation<Project>;

  @Column("applicant_id")
  applicantId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: "applicant_id" })
  applicant: Relation<User>;

  @Column("created_date")
  createdDate: Date;

  @Column()
  message: string;

  @Column()
  status: number;
}
