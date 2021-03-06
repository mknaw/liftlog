
export type RootStackParamList = {
  Root: undefined;
  ThisWorkout: undefined;
  ExerciseForm: undefined;
  RecordSet: {
    liftName: string,
    weightGoal: number,
    repGoal: number,
  };
  NotFound: undefined;
};

export type BottomTabParamList = {
  RecordSet: undefined;
  ThisWorkout: undefined;
};

export type RecordSetParamList = {
  RecordSetScreen: undefined;
};

export type ThisWorkoutParamList = {
  ThisWorkoutScreen: undefined;
};

export type RecordSetScreenProps = {
  liftName: string;
  setGoal: number;
};
