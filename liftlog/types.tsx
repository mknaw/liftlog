
export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  Programs: undefined;
  ProgramForm: undefined;
  ProgramBuilder: { programId: number };
  ThisWorkout: {  workoutId: number };
  ExerciseForm: { workoutId: number };
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
