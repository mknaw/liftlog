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
import Workout from './Workout';

@Entity()
export default class WorkoutPlan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nickname: string;

  @ManyToOne('Program', 'workoutPlans')
  program: Program;

  @OneToMany('ExercisePlan', 'workoutPlan', { onDelete: 'CASCADE' })
  exercisePlans: ExercisePlan[];

  @OneToMany('Workout', 'workoutPlan')
  workouts: Workout[];
}
