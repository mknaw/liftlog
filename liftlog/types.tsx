export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  ProgramList: undefined;
  ProgramForm: undefined;
  ProgramDetail: DetailParams;
  WorkoutPlanDetail: DetailParams;
  ExercisePlanForm: { workoutPlanId: number };
  RecordSet: DetailParams,
  NotFound: undefined;
};

type DetailParams = {
  entityId: number;
};
