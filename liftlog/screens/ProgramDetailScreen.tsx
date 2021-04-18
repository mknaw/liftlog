import React, { useEffect, useState } from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AccordionRow from '../components/AccordionRow';
import WorkoutPlanSummary from '../components/WorkoutPlanSummary';
import Program from '../db/entities/Program';
import WorkoutPlan from '../db/entities/WorkoutPlan';
import useFetchEntity from '../hooks/useFetchEntity';
import { TextStyles } from '../styles';
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
  const { entityId } = route.params;
  const entity = useFetchEntity(
    Program,
    entityId,
    { relations: ['workoutPlans'] },
  );

  const [
    lastPressedWorkoutPlanId,
    setLastPressedWorkoutPlanId,
  ] = useState<number>();

  useEffect(() => {
    if (entity) {
      navigation.setOptions({ title: entity.name });
    }
  }, [navigation, entity]);

  const onAddWorkoutPlanPress = async () => {
    if (!entity) return;
    const workout = new WorkoutPlan();
    workout.program = entity;
    await workout.save();
    navigation.navigate('WorkoutPlanDetail', { entityId: workout.id });
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
            await Program.delete(entityId);
            navigation.pop();
          },
        },
      ],
    );
  };

  if (!entity) {
    return null;
  }

  return (
    <View>
      {entity.workoutPlans && entity.workoutPlans.map((workoutPlan, key) => (
        <AccordionRow
          key={workoutPlan.id}
          allowShow={lastPressedWorkoutPlanId === workoutPlan.id}
          onPressHandler={() => {
            setLastPressedWorkoutPlanId(workoutPlan.id);
            return true;
          }}
          accordionContent={(
            <>
              <WorkoutPlanSummary workout={workoutPlan} />
              <View style={styles.workoutOptsContainer}>
                <Text
                  style={styles.workoutOptText}
                  onPress={() => navigation.push(
                    'WorkoutPlanDetail',
                    { entityId: workoutPlan.id },
                  )}
                >
                  Edit
                </Text>
                <Text
                  style={styles.workoutOptText}
                  onPress={() => navigation.push(
                    'RecordWorkout',
                    { entityId: workoutPlan.id },
                  )}
                >
                  Start
                </Text>
              </View>
            </>
          )}
        >
          { workoutPlan.nickname || `Day ${key + 1}` }
        </AccordionRow>
      ))}
      <Button
        title='Add Workout Plan'
        onPress={onAddWorkoutPlanPress}
      />
      <Button
        title='Delete'
        onPress={onDeletePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  workoutOptsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // TODO these should be from a common style
    backgroundColor: 'orange',
  },
  workoutOptText: {
    // TODO these should be from a common style
    color: 'white',
    ...TextStyles.medium,
  },
});

export default ProgramDetailScreen;
