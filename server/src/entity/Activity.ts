import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { ProjectEntity } from "./Project"
import { UserEntity } from "./User"

@Entity({ name: "activities" })
export class ActivityEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  activityTitle: string

  @Column()
  startDate: Date

  @Column()
  endDate: Date

  @Column({ type: "varchar" })
  startTime: string

  @Column({ type: "varchar" })
  endTime: string

  @Column({ type: "int", default: 0 })
  duration: number

  @Column({ type: "int", default: 0 })
  totalIncome: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => ProjectEntity, (project) => project.activities)
  @JoinColumn({ name: "project_id" })
  project: ProjectEntity

  @ManyToOne(() => UserEntity, (user) => user.activities)
  @JoinColumn({ name: "user_id" })
  user: UserEntity
}
