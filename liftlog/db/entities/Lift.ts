import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Exercise from './Exercise';

@Entity()
export default class Lift extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany('Exercise', 'lift')
  exercises: Exercise[];
}
