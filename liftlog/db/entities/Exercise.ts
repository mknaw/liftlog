import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Lift from './Lift';
import Workout from './Workout';

@Entity()
export default class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  weight: number;

  @Column('int')
  reps: number;

  @Column('int')
  sets: number;

  @ManyToOne('Workout', 'exercises')
  workout: Workout;

  @ManyToOne('Lift', 'exercises')
  lift: Lift;
}
