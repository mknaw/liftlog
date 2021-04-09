import React, { useEffect, useState } from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Alert,
  Button,
  View,
} from 'react-native';

import AccordionRow from '../components/AccordionRow';
import WorkoutSummary from '../components/WorkoutSummary';
import { Program, Workout } from '../db/entities/Entities';
import { RootStackParamList } from '../types';

type ProgramDetailRouteProp = RouteProp<
  RootStackParamList,
  'ProgramDetail'
>;

type ProgramDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProgramDetail'
>;

type Props = {
  route: ProgramDetailRouteProp;
  navigation: ProgramDetailNavigationProp;
};

const ProgramDetailScreen: React.FC<Props> = ({
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
        <AccordionRow
          key={workout.id}
          accordionContent={(
            <WorkoutSummary workout={workout} />
          )}
        >
          { `Day ${key + 1}` }
        </AccordionRow>
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

export default ProgramDetailScreen;
