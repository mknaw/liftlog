import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Exercise from './Exercise';
import WorkoutPlan from './WorkoutPlan';

@Entity()
export default class Workout extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  performed: number;

  @OneToMany('Exercise', 'workout')
  exercises: Exercise[];

  @ManyToOne('WorkoutPlan', 'workouts', { nullable: true })
  workoutPlan: WorkoutPlan;
}
