import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { ActivityEntity } from "./Activity"

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  rate: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => ActivityEntity, (activity) => activity.id, {
    onDelete: "CASCADE",
  })
  activity: ActivityEntity
}
