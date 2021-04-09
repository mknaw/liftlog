import React, { useEffect, useState } from 'react';

import { Exercise, Workout } from '../db/entities/Entities';
import ExerciseSummary from './ExerciseSummary';

type Props = {
  workout: Workout,
};

const WorkoutSummary: React.FC<Props> = (props: Props) => {
  const { workout } = props;
  const [exercises, setExercises] = useState<Array<Exercise>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const thisWorkout = await Workout.findOne(
        workout.id, { relations: ['exercises', 'exercises.lift'] },
      );
      if (!thisWorkout) {
        // TODO handle error?
        return;
      }
      setExercises(thisWorkout.exercises);
    };
    fetchData();
  }, [workout]);

  return (
    <>
      {
        exercises.map((exercise) => (
          <ExerciseSummary
            key={exercise.id}
            exercise={exercise}
          />
        ))
      }
    </>
  );
};

export default WorkoutSummary;
