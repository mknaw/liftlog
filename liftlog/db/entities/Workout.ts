import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Exercise from './Exercise';
import Program from './Program';

@Entity()
export default class Workout extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nickname: string;

  @OneToMany('Exercise', 'workout')
  exercises: Exercise[];

  @ManyToOne('Program', 'workouts')
  program: Program;
}

