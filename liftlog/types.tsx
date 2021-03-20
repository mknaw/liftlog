
export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  Workouts: undefined;
  ThisWorkout: undefined;
  ExerciseForm: undefined;
  RecordSet: RecordSetScreenProps,
  NotFound: undefined;
};

export type RecordSetParamList = {
  RecordSetScreen: undefined;
};

export type ThisWorkoutParamList = {
  ThisWorkoutScreen: undefined;
};

export type RecordSetScreenProps = {
  liftName: string,
  weightGoal: number,
  repGoal: number,
};
