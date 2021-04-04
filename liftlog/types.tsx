export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  Programs: undefined;
  ProgramForm: undefined;
  ProgramBuilder: { programId: number };
  ThisWorkout: { workoutId: number };
  ExerciseForm: { workoutId: number };
  RecordSet: { exerciseId: number },
  NotFound: undefined;
};

export type RecordSetParamList = {
  RecordSetScreen: undefined;
};

export type ThisWorkoutParamList = {
  ThisWorkoutScreen: undefined;
};
