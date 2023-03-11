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

  @Column()
  creator_user_id: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: "creator_user_id" })
  user: Relation<User>;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  contacts: string;

  @Column()
  is_closed: Boolean;

  @Column()
  created_date: Date;

  @Column()
  updated_date: Date;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

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
