import React from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';

import Workout from '../db/entities/Workout';
import useFetchEntities from '../hooks/useFetchEntities';
import { BaseStyles } from '../styles';
import { MainStackParamList } from '../types';
import { DateUtils } from '../utils';

type WorkoutHistoryScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'WorkoutHistory'
>;

type Props = {
  navigation: WorkoutHistoryScreenNavigationProp;
};

const WorkoutHistoryScreen: React.FC<Props> = ({ navigation }: Props) => {
  const workouts = useFetchEntities(
    Workout,
    { relations: ['workoutPlan', 'workoutPlan.program'] },
  );

  return (
    <View style={styles.container}>
      {workouts && workouts.map((workout) => (
        <View key={workout.id}>
          <Text>
            {DateUtils.displayDate(workout.performed)}
          </Text>
          {workout.workoutPlan && (
            <Text>{workout.workoutPlan.program.name}</Text>
          )}
        </View>
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
