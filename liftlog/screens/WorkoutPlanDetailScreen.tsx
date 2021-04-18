import React, { useEffect } from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { Button, StyleSheet, View } from 'react-native';

import ExercisePlanSummary from '../components/ExercisePlanSummary';
import TextInputRow from '../components/TextInputRow';
import WorkoutPlan from '../db/entities/WorkoutPlan';
import useFetchEntity from '../hooks/useFetchEntity';
import { BaseStyles } from '../styles';
import { RootStackParamList } from '../types';

type WorkoutPlanDetailRouteProp = RouteProp<
  RootStackParamList,
  'WorkoutPlanDetail'
>;

type WorkoutPlanDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
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
  const entity = useFetchEntity(
    WorkoutPlan,
    entityId,
    { relations: ['exercisePlans', 'exercisePlans.lift'] },
  );

  const { control, handleSubmit, errors } = useForm<Inputs>();

  useEffect(() => {
    if (!entity) {
      return;
    }
    navigation.addListener('beforeRemove', async () => {
      // TODO this concept of discarding changes has to be more broad
      if (!entity.exercisePlans.length) {
        // await WorkoutPlan.delete(entity.id);
      }
    });
  }, [entity, navigation, handleSubmit]);

  const onSaveWorkoutPlan = () => {
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
      {entity.exercisePlans && entity.exercisePlans.map((exercisePlan) => (
        <ExercisePlanSummary
          key={exercisePlan.id}
          exercisePlan={exercisePlan}
        />
      ))}
      <Button
        title='Add Exercise'
        onPress={() => {
          navigation.navigate(
            'ExercisePlanForm',
            { workoutPlanId: entity.id },
          );
        }}
      />
      <Button
        title='Save Workout Plan'
        onPress={onSaveWorkoutPlan}
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
