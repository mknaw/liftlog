import React from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';

import Workout from '../db/entities/Workout';
import useFetchEntities from '../hooks/useFetchEntities';
import { BaseStyles } from '../styles';
import { RootStackParamList } from '../types';
import { DateUtils } from '../utils';

type WorkoutHistoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WorkoutHistory'
>;

type Props = {
  navigation: WorkoutHistoryScreenNavigationProp;
};

const WorkoutHistoryScreen: React.FC<Props> = ({ navigation }: Props) => {
  const workouts = useFetchEntities(Workout);

  return (
    <View style={styles.container}>
      {workouts && workouts.map((workout) => (
        <Text>{DateUtils.displayDate(workout.performed)}</Text>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...BaseStyles.container,
  },
});

export default WorkoutHistoryScreen;
