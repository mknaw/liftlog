import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Lift from './Lift';
import WorkoutPlan from './WorkoutPlan';

@Entity()
export default class ExercisePlan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  weight: number;

  @Column('int')
  reps: number;

  @Column('int')
  sets: number;

  @ManyToOne('WorkoutPlan', 'exercisePlans')
  workoutPlan: WorkoutPlan;

  @ManyToOne('Lift', 'exercisePlans')
  lift: Lift;
}
