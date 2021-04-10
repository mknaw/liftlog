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
import WorkoutSummary from '../components/WorkoutSummary';
import { Program, Workout } from '../db/entities/Entities';
import withFetchDetail from '../hocs/withFetchDetail';
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
  entity: Program;
};

const ProgramDetailScreen: React.FC<Props> = ({
  route,
  navigation,
  entity,
}: Props) => {
  const { entityId } = route.params;

  const [
    lastPressedWorkoutId,
    setLastPressedWorkoutId,
  ] = useState<number>();

  useEffect(() => {
    if (entity) {
      navigation.setOptions({ title: entity.name });
    }
  }, [navigation, entity]);

  const onAddWorkoutPress = async () => {
    if (!entity) return;
    const workout = new Workout();
    workout.program = entity;
    await workout.save();
    navigation.navigate('WorkoutDetail', { entityId: workout.id });
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
      {entity.workouts && entity.workouts.map((workout, key) => (
        <AccordionRow
          key={workout.id}
          allowShow={lastPressedWorkoutId === workout.id}
          onPressHandler={() => {
            setLastPressedWorkoutId(workout.id);
            return true;
          }}
          accordionContent={(
            <>
              <WorkoutSummary workout={workout} />
              <View style={styles.workoutOptsContainer}>
                <Text
                  style={styles.workoutOptText}
                  onPress={() => navigation.push(
                    'WorkoutDetail',
                    { entityId: workout.id },
                  )}
                >
                  Edit
                </Text>
                <Text style={styles.workoutOptText}>
                  Start
                </Text>
              </View>
            </>
          )}
        >
          { workout.nickname || `Day ${key + 1}` }
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

export default withFetchDetail(
  ProgramDetailScreen,
  ({ route }) => {
    const { entityId } = route.params;
    return Program.findOne(
      entityId,
      { relations: ['workouts'] },
    );
  },
);
