import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("projects")
export default class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creator_user_id: number;

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
}
