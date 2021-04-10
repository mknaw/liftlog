import React, { useEffect } from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { Button, StyleSheet, View } from 'react-native';

import ExerciseSummary from '../components/ExerciseSummary';
import TextInputRow from '../components/TextInputRow';
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

type Inputs = {
  nickname: string,
};

const WorkoutDetailScreen: React.FC<Props> = ({
  navigation,
  entity,
}: Props) => {
  const { control, handleSubmit, errors } = useForm<Inputs>();

  useEffect(() => {
    navigation.addListener('beforeRemove', async () => {
      // TODO this is a little simplistic but OK for now
      if (entity && !entity.exercises.length) {
        await Workout.delete(entity.id);
      } else {
        handleSubmit(async (data) => {
          const { nickname } = data;
          if (nickname) {
            // TODO this won't work at present because entity passed by prop
            entity.nickname = nickname;
            await entity.save();
          }
        })();
      }
    });
  // TODO have to have empty dependency array to not bind many times
  // there is probably some different way to do this.
  }, []);

  if (!entity) {
    return null;
  }
  return (
    <View style={styles.container}>
      <TextInputRow
        name='nickname'
        value={entity.nickname}
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
    </View>
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
