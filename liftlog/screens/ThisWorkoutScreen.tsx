import React, { Component } from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { StackNavigationProp } from '@react-navigation/stack';

import { executeSql } from '../db/Database';
import WorkoutRow from '../components/WorkoutRow';
import { RootStackParamList } from '../types';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ThisWorkout'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function ThisWorkoutScreen(props: Props) {
  const { navigation } = props;
  const [exercises, setExercises] = React.useState(null);
  React.useEffect(() => {
    // TODO would be nice to ORMize this kind of stuff
    // also avoid name collisions (like on `name`).
    executeSql(`
      SELECT * FROM exercises e
      INNER JOIN (SELECT id, name AS liftName FROM lifts) AS l
      ON l.id = e.lift;
    `, [])
      .then(exercises => setExercises(exercises))
      .catch(e => console.log(e));
  }, []);

  const headers = ['Exercise', 'Weight', 'Rep Goal'];

  if (exercises === null) {
    // TODO is this the move?
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={headers} style={styles.head} textStyle={styles.head_text} />
        {exercises.map((row, key) => {
          return (
            <WorkoutRow {...row} key={key} />
          );
        })}
      </Table>
      <Button
        title={'Add exercise'}
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

