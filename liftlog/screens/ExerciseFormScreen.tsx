import React, { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import LiftPicker from '../components/LiftPicker';
import TextInputRow from '../components/TextInputRow';
import { Exercise, Lift, Workout } from '../db/entities/Entities';
import { BaseStyles, TextStyles } from '../styles';
import { RecordSetScreenProps, RootStackParamList } from '../types';

type ExerciseFormRouteProp = RouteProp<
  RootStackParamList,
  'ExerciseForm'
>;

type ExerciseFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ExerciseForm'
>;

type Props = {
  route: ExerciseFormRouteProp;
  navigation: ExerciseFormNavigationProp;
};

type Inputs = {
  // TODO really all should be ints here
  weight: number,
  reps: number,
  lift: number,
};

export default function ExerciseFormScreen(props: Props) {
  const { route, navigation } = props;
  const { workoutId } = route.params;

  const { control, handleSubmit, errors } = useForm<Inputs>();

  async function newExercise(data: Inputs) {
    // TODO surely there must be a way to assign FK by ID?
    const workout = await Workout.findOne(workoutId);
    const lift = await Lift.findOne(data.lift);
    if (!workout || !lift) {
      return;
    }
    const exercise = new Exercise();
    exercise.workout = workout;
    exercise.lift = lift;
    // TODO these should be coerced to number by input or hook-form
    exercise.weight = Number(data.weight);
    exercise.reps = Number(data.reps);
    await exercise.save();
  }

  return (
    <View style={styles.container}>
      <TextInputRow
        name='weight'
        control={control}
        rules={{
          required: {
            value: true,
            // TODO should just have a standard msg for all
            message: 'Weight goal required',
          },
        }}
        errors={errors}
      />
      <TextInputRow
        name='reps'
        control={control}
        rules={{
          required: {
            value: true,
            // TODO should just have a standard msg for all
            message: 'Rep goal required',
          },
        }}
        errors={errors}
      />
      <LiftPicker
        name='lift'
        control={control} />
      <Button
        title='Add Exercise'
        onPress={handleSubmit(async (data) => {
          await newExercise(data);
          navigation.pop();
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    ...BaseStyles.container,
  },
  text: {
    fontSize: 20,
  },
  btn: {
    margin: 20,
    backgroundColor: '#c8e1ff',
    borderRadius: 2,
  },
});

