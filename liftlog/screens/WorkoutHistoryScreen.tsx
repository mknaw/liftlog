import React, { useState } from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import { DateTime } from 'luxon';
import { StyleSheet, Text, View } from 'react-native';
import { Between } from 'typeorm';

import CalendarMonth from '../components/CalendarMonth';
import Workout from '../db/entities/Workout';
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
  const [
    displayedWorkouts,
    setDisplayedWorkouts,
  ] = useState<Array<Workout>>([]);

  const onDayPress = async (date: DateTime) => {
    const fetchedWorkouts = await Workout.find({
      where: {
        performed: Between(
          date.toSeconds(),
          date.endOf('day').toSeconds(),
        ),
      },
      relations: ['workoutPlan', 'workoutPlan.program'],
    });
    setDisplayedWorkouts(fetchedWorkouts);
  };

  const today = DateTime.local(2020, 11, 1);

  return (
    <View style={styles.container}>
      <CalendarMonth
        month={today.month}
        year={today.year}
        onDayPress={onDayPress}
      />
      {displayedWorkouts && displayedWorkouts.map((workout) => (
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
