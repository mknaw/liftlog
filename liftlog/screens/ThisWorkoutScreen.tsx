import React, { Component } from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { StackNavigationProp } from '@react-navigation/stack';

import WorkoutRow from '../components/WorkoutRow';
import { RootStackParamList } from '../types';

import { Exercise, Lift } from '../db/entities/Entities';

type ThisWorkoutNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ThisWorkout'
>;

type Props = {
  navigation: ThisWorkoutNavigationProp;
};

export default function ThisWorkoutScreen(props: Props) {
  const { navigation } = props;
  const [exercises, setExercises] = React.useState(null);
  React.useEffect(() => {
    Exercise.find()
      .then(x => console.log('whatever'))
      .catch(e => console.log(e));
  }, []);

  const headers = ['Exercise', 'Weight', 'Rep Goal'];

  // {exercises.map((row, key) => {
    // return (
      // <WorkoutRow {...row} key={key} />
    // );
  // })}
  return (
    <ScrollView style={styles.container}>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={headers} style={styles.head} textStyle={styles.head_text} />
      </Table>
      <Button
        title='Add exercise'
        onPress={() => {
          navigation.navigate('ExerciseForm');
        }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

