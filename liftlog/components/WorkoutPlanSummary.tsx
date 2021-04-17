import React, { useEffect, useState } from 'react';

import ExercisePlan from '../db/entities/ExercisePlan';
import WorkoutPlan from '../db/entities/WorkoutPlan';
import ExercisePlanSummary from './ExercisePlanSummary';

type Props = {
  workout: WorkoutPlan,
};

const WorkoutPlanSummary: React.FC<Props> = (props: Props) => {
  const { workout } = props;
  const [exercisePlans, setExercisePlans] = useState<Array<ExercisePlan>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const thisWorkoutPlan = await WorkoutPlan.findOne(
        workout.id, { relations: ['exercisePlans', 'exercisePlans.lift'] },
      );
      if (!thisWorkoutPlan) {
        // TODO handle error?
        return;
      }
      setExercisePlans(thisWorkoutPlan.exercisePlans);
    };
    fetchData();
  }, [workout]);

  return (
    <>
      {
        exercisePlans.map((exercisePlan) => (
          <ExercisePlanSummary
            key={exercisePlan.id}
            exercisePlan={exercisePlan}
          />
        ))
      }
    </>
  );
};

export default WorkoutPlanSummary;
