import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ExercisePlan from '../db/entities/ExercisePlan';
import { TextStyles } from '../styles';

type Props = {
  exercisePlan: ExercisePlan,
};

const ExercisePlanSummary: React.FC<Props> = ({ exercisePlan }: Props) => {
  const summary = `${exercisePlan.lift.name} \n`
    + `${exercisePlan.sets}x${exercisePlan.reps}`;

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

export default ExercisePlanSummary;
