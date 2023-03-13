import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Relation } from "typeorm";
import Project from "./Project.js";

@Entity("faculties")
export default class Faculty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: "shortname" })
  shortName: string;
}
