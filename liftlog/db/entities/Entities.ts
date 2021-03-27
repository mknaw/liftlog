
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

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

@Entity()
export class Lift extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @OneToMany(type => Exercise, exercise => exercise.lift)
    exercises: Exercise[];

}
