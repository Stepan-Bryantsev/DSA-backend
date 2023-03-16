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

@Entity("user_recommendations")
export default class Recommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id" })
  userId: number;

  @Column({ name: "project_id" })
  projectId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: "user_id" })
  user: Relation<User>;

  @ManyToOne((type) => Project)
  @JoinColumn({ name: "project_id" })
  project: Relation<Project>;
}
