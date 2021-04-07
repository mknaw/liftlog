import React, { useEffect, useState } from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Alert,
  Button,
  View,
} from 'react-native';

import TextRow from '../components/TextRow';
import { Program, Workout } from '../db/entities/Entities';
import { RootStackParamList } from '../types';

type ProgramBuilderRouteProp = RouteProp<
  RootStackParamList,
  'ProgramBuilder'
>;

type ProgramBuilderNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProgramBuilder'
>;

type Props = {
  route: ProgramBuilderRouteProp;
  navigation: ProgramBuilderNavigationProp;
};

const ProgramBuilderScreen: React.FC<Props> = ({
  route,
  navigation,
}: Props) => {
  const { programId } = route.params;

  const [program, setProgram] = useState<Program>();

  useEffect(() => {
    navigation.addListener('focus', async () => {
      const thisProgram = await Program.findOne(
        programId,
        { relations: ['workouts'] },
      );
      if (!thisProgram) {
        return;
      }
      setProgram(thisProgram);
      navigation.setOptions({ title: thisProgram.name });
    });
  }, [navigation, programId]);

  const onAddWorkoutPress = async () => {
    if (!program) return;
    const workout = new Workout();
    workout.program = program;
    await workout.save();
    navigation.navigate('ThisWorkout', { workoutId: workout.id });
  };

  const onDeletePress = async () => {
    Alert.alert(
      'Delete Program',
      'Are you sure you want to delete this Program?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await Program.delete(programId);
            navigation.pop();
          },
        },
      ],
    );
  };

  if (!program) {
    return null;
  }

  return (
    <View>
      {program.workouts && program.workouts.map((workout, key) => (
        <TextRow
          key={workout.id}
          onPress={() => {
            navigation.navigate('ThisWorkout', { workoutId: workout.id });
          }}
        >
          { `Day ${key + 1}` }
        </TextRow>
      ))}
      <Button
        title='Add Workout'
        onPress={onAddWorkoutPress}
      />
      <Button
        title='Delete'
        onPress={onDeletePress}
      />
    </View>
  );
};

export default ProgramBuilderScreen;
