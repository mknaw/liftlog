export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  ProgramList: undefined;
  ProgramForm: undefined;
  ProgramDetail: DetailParams;
  WorkoutDetail: DetailParams;
  ExerciseForm: { workoutId: number };
  RecordSet: DetailParams,
  NotFound: undefined;
};

type DetailParams = {
  entityId: number;
};
