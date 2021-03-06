import React, { useEffect, useState } from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Button, ScrollView, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import WorkoutRow from '../components/WorkoutRow';
import { BaseStyles } from '../styles';
import { RootStackParamList } from '../types';

import { Lift, Program, Workout } from '../db/entities/Entities';

type ThisWorkoutRouteProp = RouteProp<
  RootStackParamList,
  'ThisWorkout'
>;

type ThisWorkoutNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ThisWorkout'
>;

type Props = {
  route: ThisWorkoutRouteProp;
  navigation: ThisWorkoutNavigationProp;
};

export default function ThisWorkoutScreen(props: Props) {
  const { route, navigation } = props;
  const { workoutId } = route.params;

  const [workout, setWorkout] = useState<Workout>();

  useEffect(() => {
    const fetchData = async () => {
      const workout = await Workout.findOne(
        workoutId, { relations: ['exercises', 'exercises.lift'] });
      if (!workout) {
        console.log('error');
        return;
      }
      setWorkout(workout);
    };
    navigation.addListener('focus', () => {
      fetchData();
    });
  }, []);

  const headers = ['Exercise', 'Weight', 'Rep Goal'];

  if (!workout) {
    return null;
  }
  return (
    <ScrollView style={styles.container}>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={headers} style={styles.head} textStyle={styles.head_text} />
        {workout.exercises && workout.exercises.map((exercise, key) => (
          <WorkoutRow
            key={key}
            liftName={exercise.lift.name}
            weight={exercise.weight}
            reps={exercise.reps} />
        ))}
      </Table>
      <Button
        title='Add Exercise'
        onPress={() => {
          navigation.navigate(
            'ExerciseForm', { workoutId: workout.id });
        }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...BaseStyles.container,
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  head_text: {
    textAlign: 'center',
    margin: 6,
  },
});

