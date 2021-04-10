import React from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, ScrollView, StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';

import WorkoutRow from '../components/WorkoutRow';
import { Workout } from '../db/entities/Entities';
import withFetchDetail from '../hocs/withFetchDetail';
import { BaseStyles } from '../styles';
import { RootStackParamList } from '../types';

type WorkoutDetailRouteProp = RouteProp<
  RootStackParamList,
  'WorkoutDetail'
>;

type WorkoutDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WorkoutDetail'
>;

type Props = {
  route: WorkoutDetailRouteProp;
  navigation: WorkoutDetailNavigationProp;
  entity: Workout;
};

const WorkoutDetailScreen: React.FC<Props> = (props: Props) => {
  const { navigation, entity } = props;

  const headers = ['Exercise', 'Weight', 'Sets', 'Rep Goal'];

  if (!entity) {
    return null;
  }
  return (
    <ScrollView style={styles.container}>
      <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Row data={headers} style={styles.head} textStyle={styles.head_text} />
        {entity.exercises && entity.exercises.map((exercise) => (
          <WorkoutRow
            key={exercise.id}
            exercise={exercise}
          />
        ))}
      </Table>
      <Button
        title='Add Exercise'
        onPress={() => {
          navigation.navigate(
            'ExerciseForm',
            { workoutId: entity.id },
          );
        }}
      />
    </ScrollView>
  );
};

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

export default withFetchDetail(
  WorkoutDetailScreen,
  ({ route }: Props) => {
    const { entityId } = route.params;
    return Workout.findOne(
      entityId, { relations: ['exercises', 'exercises.lift'] },
    );
  },
);
