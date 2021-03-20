
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exercise } from './Exercise';

@Entity()
export class Workout extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Exercise, exercise => exercise.lift)
    exercises: Exercise[];

    // TODO created / modified ts
}
