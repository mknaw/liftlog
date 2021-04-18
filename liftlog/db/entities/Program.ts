import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import WorkoutPlan from './WorkoutPlan';

@Entity()
export default class Program extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany('WorkoutPlan', 'program')
  workoutPlans: WorkoutPlan[];

  // TODO created / modified ts
}
