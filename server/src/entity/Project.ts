import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { ActivityEntity } from "./Activity"

@Entity({ name: "project" })
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name_project: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => ActivityEntity, (activity) => activity.id)
  activity: ActivityEntity
}
