import React, { useEffect, useState } from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Alert,
  Button,
  Text,
  View,
} from 'react-native';

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
      setProgram(await Program.findOne(
        programId,
        { relations: ['workouts'] },
      ));
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
      <Text>{program.name}</Text>
      {program.workouts && program.workouts.map((workout, key) => (
        <Text
          key={workout.id}
          onPress={() => {
            navigation.navigate('ThisWorkout', { workoutId: workout.id });
          }}
        >
          { `Day ${key + 1}` }
        </Text>
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
