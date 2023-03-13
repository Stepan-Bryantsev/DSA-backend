import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Relation } from "typeorm";

@Entity("categories")
export default class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column("is_custom")
  isCustom: boolean;
}
