import React from 'react';

import {
  Text,
  View,
} from 'react-native';

import { Exercise } from '../db/entities/Entities';

type Props = {
  exercise: Exercise,
};

const ExerciseSummary: React.FC<Props> = (props: Props) => {
  const { exercise } = props;
  const summary = `${exercise.lift.name} ${exercise.sets}x${exercise.reps}`;

  return (
    <View>
      <Text>{summary}</Text>
    </View>
  );
};

export default ExerciseSummary;
