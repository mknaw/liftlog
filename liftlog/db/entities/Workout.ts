import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Exercise from './Exercise';

@Entity()
export default class Workout extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  performed: number;

  @OneToMany('Exercise', 'workout')
  exercises: Exercise[];
}
