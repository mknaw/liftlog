export type RootStackParamList = {
  Main: undefined;
  LiftModal: undefined;
};

export type MainStackParamList = {
  Root: undefined;
  Home: undefined;
  ProgramList: undefined;
  ProgramForm: undefined;
  ProgramDetail: DetailParams;
  WorkoutPlanDetail: DetailParams;
  ExercisePlanForm: {
    workoutPlanId?: number,
    selectedLiftId?: number,
  };
  RecordWorkout: DetailParams,
  WorkoutHistory: undefined;
  NotFound: undefined;
};

type DetailParams = {
  entityId: number;
};
