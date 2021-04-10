import React, { useEffect, useState } from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import RepSlider from '../components/RepSlider';
import { Exercise } from '../db/entities/Entities';
import { BaseStyles, TextStyles } from '../styles';
import { RootStackParamList } from '../types';

type RecordSetRouteProp = RouteProp<
  RootStackParamList,
  'RecordSet'
>;

type RecordSetNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RecordSet'
>;

type Props = {
  route: RecordSetRouteProp;
  navigation: RecordSetNavigationProp;
};

const RecordSetScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const { exerciseId } = route.params;

  const [exercise, setExercise] = useState<Exercise>();
  const [setNumber, setSetNumber] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      setExercise(await Exercise.findOne(
        exerciseId,
        { relations: ['lift'] },
      ));
    };
    fetchData();
  }, [exerciseId]);

  if (!exercise) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {`${exercise.lift.name} - ${exercise.weight} lbs.`}
      </Text>
      <Text style={styles.goal}>
        {`Goal: ${exercise.reps}`}
      </Text>
      <Text style={styles.goal}>
        {`Set: ${setNumber}`}
      </Text>
      <RepSlider repGoal={exercise.reps} />
      <Button
        onPress={() => {
          if (setNumber > exercise.reps) {
            navigation.navigate(
              'WorkoutDetail',
              { entityId: exercise.workout.id },
            );
          } else {
            setSetNumber(setNumber + 1);
          }
        }}
        title='Record Set'
        color='red'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    ...BaseStyles.container,
  },
  title: {
    ...TextStyles.title,
  },
  goal: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 4,
  },
  picker: {
    fontSize: 20,
    padding: 5,
    borderColor: 'red',
    borderWidth: 1,
    color: 'red',
  },
});

export default RecordSetScreen;
