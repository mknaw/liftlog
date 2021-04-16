import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Exercise from '../db/entities/Exercise';
import { TextStyles } from '../styles';

type Props = {
  exercise: Exercise,
};

const ExerciseSummary: React.FC<Props> = ({ exercise }: Props) => {
  const summary = `${exercise.lift.name} ${exercise.sets}x${exercise.reps}`;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{summary}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    backgroundColor: 'orange',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    ...TextStyles.medium,
  },
});

export default ExerciseSummary;
