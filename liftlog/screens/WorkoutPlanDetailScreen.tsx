import React from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { Button, StyleSheet, View } from 'react-native';

import ExercisePlanSummary from '../components/ExercisePlanSummary';
import TextInputRow from '../components/TextInputRow';
import WorkoutPlan from '../db/entities/WorkoutPlan';
import useFetchEntity from '../hooks/useFetchEntity';
import { BaseStyles } from '../styles';
import { MainStackParamList } from '../types';

type WorkoutPlanDetailRouteProp = RouteProp<
  MainStackParamList,
  'WorkoutPlanDetail'
>;

type WorkoutPlanDetailNavigationProp = StackNavigationProp<
  MainStackParamList,
  'WorkoutPlanDetail'
>;

type Props = {
  route: WorkoutPlanDetailRouteProp;
  navigation: WorkoutPlanDetailNavigationProp;
};

type Inputs = {
  nickname: string,
};

const WorkoutPlanDetailScreen: React.FC<Props> = ({
  route,
  navigation,
}: Props) => {
  const { entityId } = route.params;
  const workoutPlan = useFetchEntity(
    WorkoutPlan,
    entityId,
    { relations: ['exercisePlans', 'exercisePlans.lift'] },
  );

  const { control, handleSubmit, errors } = useForm<Inputs>();

  const onSaveWorkoutPlan = () => {
    if (!workoutPlan) {
      return;
    }
    handleSubmit(async (data) => {
      const { nickname } = data;
      if (nickname) {
        workoutPlan.nickname = nickname;
        await workoutPlan.save();
      }
      navigation.pop();
    })();
  };

  const onDiscardWorkoutPlan = () => {
    if (workoutPlan) {
      // TODO doesn't actually cascade delete ExercisePlans
      WorkoutPlan.delete(workoutPlan.id).finally(() => navigation.pop());
    }
  };

  if (!workoutPlan) {
    return null;
  }
  return (
    <View style={styles.container}>
      <TextInputRow
        name='nickname'
        defaultValue={workoutPlan.nickname}
        placeholder='Day X'
        control={control}
        errors={errors}
      />
      {workoutPlan.exercisePlans && workoutPlan.exercisePlans.map(
        (exercisePlan) => (
          <ExercisePlanSummary
            key={exercisePlan.id}
            exercisePlan={exercisePlan}
          />
        ),
      )}
      <Button
        title='Add Exercise'
        onPress={() => {
          navigation.navigate(
            'ExercisePlanForm',
            { workoutPlanId: workoutPlan.id },
          );
        }}
      />
      <Button
        title='Save Workout Plan'
        onPress={onSaveWorkoutPlan}
      />
      {/* TODO only show if new? */}
      <Button
        title='Discard Workout Plan'
        onPress={onDiscardWorkoutPlan}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...BaseStyles.container,
  },
});

export default WorkoutPlanDetailScreen;
