import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  password: string;

  @Column()
  created_date: Date;

  @Column()
  updated_date: Date;
}
