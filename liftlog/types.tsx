export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  ProgramList: undefined;
  ProgramForm: undefined;
  ProgramDetail: DetailParams;
  WorkoutPlanDetail: DetailParams;
  ExercisePlanForm: { workoutPlanId: number };
  RecordWorkout: DetailParams,
  WorkoutHistory: undefined;
  NotFound: undefined;
};

type DetailParams = {
  entityId: number;
};
