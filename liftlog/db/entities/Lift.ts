import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import ExercisePlan from './ExercisePlan';

@Entity()
export default class Lift extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany('ExercisePlan', 'lift')
  exercisePlans: ExercisePlan[];
}
