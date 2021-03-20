
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lift } from './Lift';
import { Workout } from './Workout';

@Entity()
export class Exercise extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    weight: number;

    @Column('int')
    reps: number;

    @ManyToOne(type => Workout, workout => workout.exercises)
    workout: Workout;

    @ManyToOne(type => Lift, lift => lift.exercises)
    lift: Lift;

}
