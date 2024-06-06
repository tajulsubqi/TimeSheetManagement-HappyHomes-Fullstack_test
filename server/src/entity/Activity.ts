import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { UserEntity } from "./User"
import { ProjectEntity } from "./Project"

@Entity({ name: "activities" })
export class ActivityEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  activity_title: string

  @Column()
  start_date: Date

  @Column()
  end_date: Date

  @Column()
  start_time: Date

  @Column()
  end_time: Date

  @Column()
  duration: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne(() => ProjectEntity, (project) => project.id)
  proyek: ProjectEntity

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity
}
