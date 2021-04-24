import React from 'react';

import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import TextInputRow from '../components/TextInputRow';
import ExercisePlan from '../db/entities/ExercisePlan';
import Lift from '../db/entities/Lift';
import WorkoutPlan from '../db/entities/WorkoutPlan';
import useFetchEntity from '../hooks/useFetchEntity';
import { BaseStyles, TextStyles } from '../styles';
import { MainStackParamList, RootStackParamList } from '../types';
import { FormUtils } from '../utils';

type ExercisePlanFormRouteProp = RouteProp<
  MainStackParamList,
  'ExercisePlanForm'
>;

type ExercisePlanFormNavigationProp = CompositeNavigationProp<
 StackNavigationProp<MainStackParamList>,
 StackNavigationProp<
   RootStackParamList,
   'Main'
 >
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
  const { workoutPlanId, selectedLiftId } = route.params;
  const { control, handleSubmit, errors } = useForm<Inputs>();

  const selectedLift = useFetchEntity(
    Lift,
    selectedLiftId,
  );

  async function newExercisePlan(data: Inputs) {
    // TODO surely there must be a way to assign FK by ID?
    const workoutPlan = await WorkoutPlan.findOne(workoutPlanId);
    if (!selectedLift || !workoutPlan) {
      return;
    }
    const exercisePlan = new ExercisePlan();
    exercisePlan.workoutPlan = workoutPlan;
    exercisePlan.lift = selectedLift;
    // TODO these should be coerced to number by input or hook-form
    exercisePlan.weight = Number(data.weight);
    exercisePlan.sets = Number(data.sets);
    exercisePlan.reps = Number(data.reps);
    await exercisePlan.save();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('LiftModal')}
      >
        <Text style={styles.text}>
          {selectedLift ? selectedLift.name : 'Pick Lift'}
        </Text>
      </TouchableOpacity>
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
      {selectedLift && (
        <Button
          title='Add Exercise'
          onPress={handleSubmit(async (data) => {
            await newExercisePlan(data);
            navigation.pop();
          })}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    ...BaseStyles.container,
  },
  text: {
    ...TextStyles.medium,
  },
  btn: {
    margin: 20,
    backgroundColor: '#c8e1ff',
    borderRadius: 2,
  },
});

export default ExercisePlanFormScreen;
