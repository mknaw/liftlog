import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import ExercisePlan from './ExercisePlan';
import Program from './Program';

@Entity()
export default class WorkoutPlan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nickname: string;

  @OneToMany('ExercisePlan', 'workoutPlan')
  exercisePlans: ExercisePlan[];

  @ManyToOne('Program', 'workouts')
  program: Program;
}
