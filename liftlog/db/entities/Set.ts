import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Exercise from './Exercise';

@Entity()
export default class Set extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  weight: number;

  @Column('int')
  reps: number;

  @ManyToOne('Exercise', 'sets')
  exercise: Exercise;
}
