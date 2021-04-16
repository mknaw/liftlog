import React, { useEffect } from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { Button, StyleSheet, View } from 'react-native';

import ExerciseSummary from '../components/ExerciseSummary';
import TextInputRow from '../components/TextInputRow';
import Workout from '../db/entities/Workout';
import useFetchEntity from '../hooks/useFetchEntity';
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
};

type Inputs = {
  nickname: string,
};

const WorkoutDetailScreen: React.FC<Props> = ({
  route,
  navigation,
}: Props) => {
  const { entityId } = route.params;
  const entity = useFetchEntity(
    Workout,
    entityId,
    { relations: ['exercises', 'exercises.lift'] },
  );

  const { control, handleSubmit, errors } = useForm<Inputs>();

  useEffect(() => {
    if (!entity) {
      return;
    }
    navigation.addListener('beforeRemove', async () => {
      // TODO this concept of discarding changes has to be more broad
      if (!entity.exercises.length) {
        await Workout.delete(entity.id);
      }
    });
  }, [entity, navigation, handleSubmit]);

  const onSaveWorkout = () => {
    if (!entity) {
      return;
    }
    handleSubmit(async (data) => {
      const { nickname } = data;
      if (nickname) {
        entity.nickname = nickname;
        await entity.save();
      }
      navigation.pop();
    })();
  };

  if (!entity) {
    return null;
  }
  return (
    <View style={styles.container}>
      <TextInputRow
        name='nickname'
        defaultValue={entity.nickname}
        placeholder='Day X'
        control={control}
        errors={errors}
      />
      {entity.exercises && entity.exercises.map((exercise) => (
        <ExerciseSummary
          key={exercise.id}
          exercise={exercise}
        />
      ))}
      <Button
        title='Add Exercise'
        onPress={() => {
          navigation.navigate(
            'ExerciseForm',
            { workoutId: entity.id },
          );
        }}
      />
      <Button
        title='Save Workout'
        onPress={onSaveWorkout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...BaseStyles.container,
  },
});

export default WorkoutDetailScreen;
