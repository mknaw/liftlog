export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  ProgramList: undefined;
  ProgramForm: undefined;
  ProgramDetail: DetailParams;
  WorkoutDetail: DetailParams;
  ExerciseForm: { workoutId: number };
  RecordSet: { exerciseId: number },
  NotFound: undefined;
};

type DetailParams = {
  entityId: number;
};
