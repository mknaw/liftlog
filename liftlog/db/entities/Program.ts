import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Workout from './Workout';

@Entity()
export default class Program extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany('Workout', 'program')
  workouts: Workout[];

  // TODO created / modified ts
}
