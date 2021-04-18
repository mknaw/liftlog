import React, { useEffect, useState } from 'react';

import { Text } from 'react-native';

import Workout from '../db/entities/Workout';

type Props = {
  workoutId: number,
};

const WorkoutSummary: React.FC<Props> = (props: Props) => {
  const { workoutId } = props;

  const [workout, setWorkout] = useState<Workout>();

  // TODO kind of ridiculous to have to reget the whole Exercise here
  // but for the life of me can't figure out how to reload just relations
  // with typeorm. might be the final straw, try `sequelize` instead.
  useEffect(() => {
    const fetch = async () => {
      const thisWorkout = await Workout.findOne(
        workoutId,
        { relations: ['exercises', 'exercises.lift', 'exercises.sets'] },
      );
      setWorkout(thisWorkout);
    };
    fetch();
  }, []);

  if (!workout || !workout.exercises.length) {
    return null;
  }

  return (
    <>
      {workout.exercises.map((exercise) => (
        <>
          <Text>{`${exercise.lift.name}`}</Text>
          {exercise.sets && exercise.sets.map((set) => (
            <Text>{`${set.reps}`}</Text>
          ))}
        </>
      ))}
    </>
  );
};

export default WorkoutSummary;
