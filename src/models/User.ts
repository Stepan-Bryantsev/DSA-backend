import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Relation,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Category from "./Category.js";
import Faculty from "./Faculty.js";
import Project from "./Project.js";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  fullname: string;

  @Column()
  last_login: Date;

  @Column()
  description: string;

  @Column()
  faculty_id: number;

  @ManyToOne((type) => Faculty)
  @JoinColumn({ name: "faculty_id" })
  faculty: Relation<Faculty>;

  @Column()
  password: string;

  @Column()
  created_date: Date;

  @Column()
  updated_date: Date;

  @ManyToMany((type) => Category)
  @JoinTable({
    name: "user_categories",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "category_id",
      referencedColumnName: "id",
    },
  })
  categories: Category[];
}
