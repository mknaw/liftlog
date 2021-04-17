import React from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { Button, StyleSheet, View } from 'react-native';

import LiftPicker from '../components/LiftPicker';
import TextInputRow from '../components/TextInputRow';
import ExercisePlan from '../db/entities/ExercisePlan';
import Lift from '../db/entities/Lift';
import WorkoutPlan from '../db/entities/WorkoutPlan';
import { BaseStyles } from '../styles';
import { RootStackParamList } from '../types';
import { FormUtils } from '../utils';

type ExercisePlanFormRouteProp = RouteProp<
  RootStackParamList,
  'ExercisePlanForm'
>;

type ExercisePlanFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ExercisePlanForm'
>;

type Props = {
  route: ExercisePlanFormRouteProp;
  navigation: ExercisePlanFormNavigationProp;
};

type Inputs = {
  // TODO really all should be ints here
  weight: number,
  sets: number,
  reps: number,
  lift: number,
};

const ExercisePlanFormScreen: React.FC<Props> = ({
  route,
  navigation,
}: Props) => {
  const { workoutPlanId } = route.params;

  const { control, handleSubmit, errors } = useForm<Inputs>();

  async function newExercisePlan(data: Inputs) {
    // TODO surely there must be a way to assign FK by ID?
    const workoutPlan = await WorkoutPlan.findOne(workoutPlanId);
    const lift = await Lift.findOne(data.lift);
    if (!workoutPlan || !lift) {
      return;
    }
    const exercisePlan = new ExercisePlan();
    exercisePlan.workoutPlan = workoutPlan;
    exercisePlan.lift = lift;
    // TODO these should be coerced to number by input or hook-form
    exercisePlan.weight = Number(data.weight);
    exercisePlan.sets = Number(data.sets);
    exercisePlan.reps = Number(data.reps);
    await exercisePlan.save();
  }

  return (
    <View style={styles.container}>
      <TextInputRow
        name='weight'
        control={control}
        rules={{
          ...FormUtils.requiredRule('Weight goal'),
          min: {
            value: 1,
            message: 'Please enter some weight',
          },
          max: {
            value: 2000,
            message: 'Really? Please enter less weight...',
          },
          ...FormUtils.NumericValidationRule,
        }}
        errors={errors}
        keyboardType='numeric'
      />
      <TextInputRow
        name='sets'
        control={control}
        rules={{
          ...FormUtils.requiredRule('Set goal'),
          min: {
            value: 1,
            message: 'Must do at least one set!',
          },
          max: {
            value: 50,
            message: 'Please enter fewer sets',
          },
          ...FormUtils.NumericValidationRule,
        }}
        errors={errors}
        keyboardType='numeric'
      />
      <TextInputRow
        name='reps'
        control={control}
        rules={{
          ...FormUtils.requiredRule('Rep goal'),
          min: {
            value: 1,
            message: 'Must do at least one rep!',
          },
          max: {
            value: 100,
            message: 'Please enter fewer reps - this is not cardio...',
          },
          ...FormUtils.NumericValidationRule,
        }}
        errors={errors}
        keyboardType='numeric'
      />
      <LiftPicker
        name='lift'
        control={control}
      />
      <Button
        title='Add Exercise'
        onPress={handleSubmit(async (data) => {
          await newExercisePlan(data);
          navigation.pop();
        })}
      />
    </View>
  );
};

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

export default ExercisePlanFormScreen;