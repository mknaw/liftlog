import {
  BaseEntity,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Lift from './Lift';
import Set from './Set';
import Workout from './Workout';

@Entity()
export default class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('Workout', 'exercises')
  workout: Workout;

  @ManyToOne('Lift', 'exercises')
  lift: Lift;

  @OneToMany('Set', 'exercise')
  sets: Set[];
}
