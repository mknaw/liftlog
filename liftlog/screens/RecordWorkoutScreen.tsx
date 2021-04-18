import React, { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import RepSlider from '../components/RepSlider';
import WorkoutSummary from '../components/WorkoutSummary';
import Exercise from '../db/entities/Exercise';
import ExercisePlan from '../db/entities/ExercisePlan';
import Set from '../db/entities/Set';
import Workout from '../db/entities/Workout';
import WorkoutPlan from '../db/entities/WorkoutPlan';
import useFetchEntity from '../hooks/useFetchEntity';
import { BaseStyles, TextStyles } from '../styles';
import { RootStackParamList } from '../types';
import { DateUtils } from '../utils';

type RecordWorkoutRouteProp = RouteProp<
  RootStackParamList,
  'RecordWorkout'
>;

type RecordWorkoutNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RecordWorkout'
>;

type Props = {
  route: RecordWorkoutRouteProp;
  navigation: RecordWorkoutNavigationProp;
};

const RecordWorkoutScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const { entityId } = route.params;
  const workoutPlan = useFetchEntity(
    WorkoutPlan,
    entityId,
    { relations: ['exercisePlans', 'exercisePlans.lift'] },
  );

  const [workout, setWorkout] = useState<Workout>();
  const [exercise, setExercise] = useState<Exercise>();
  const [exercisePlanIdx, setExercisePlanIdx] = useState(0);
  const [exercisePlan, setExercisePlan] = useState<ExercisePlan>();
  const [reps, setReps] = useState(1);
  const [weight, setWeight] = useState<number>(0);
  const [setNumber, setSetNumber] = useState(1);

  useEffect(() => {
    const initializeWorkout = async () => {
      const newWorkout = new Workout();
      newWorkout.performed = DateUtils.currentUnixTS();
      await newWorkout.save();
      setWorkout(newWorkout);
    };
    initializeWorkout();
  }, []);

  useEffect(() => {
    if (workoutPlan) {
      setExercisePlan(workoutPlan.exercisePlans[exercisePlanIdx]);
    }
  }, [workoutPlan, exercisePlanIdx]);

  useEffect(() => {
    if (exercisePlan) {
      setWeight(exercisePlan.weight);
    }
  }, [exercisePlan]);

  useEffect(() => {
    const initializeExercise = async () => {
      if (!exercisePlan || !workout) {
        return;
      }
      const thisExercise = new Exercise();
      thisExercise.lift = exercisePlan.lift;
      thisExercise.workout = workout;
      await thisExercise.save();
      setExercise(thisExercise);
    };
    initializeExercise();
  }, [exercisePlan, workout]);

  const isWorkoutComplete = () => (
    workoutPlan
    && exercisePlanIdx >= workoutPlan.exercisePlans.length - 1
  );

  const nextExercise = () => {
    if (isWorkoutComplete()) {
      navigation.pop();
    }
    setExercisePlanIdx((prev) => prev + 1);
  };

  if (!workoutPlan || !exercisePlan) {
    return null;
  }

  const recordSet = () => {
    if (exercise) {
      const thisSet = new Set();
      thisSet.exercise = exercise;
      thisSet.weight = weight;
      thisSet.reps = reps;
      thisSet.save();
    }
    if (setNumber >= exercisePlan.sets) {
      nextExercise();
      setSetNumber(1);
    } else {
      setSetNumber(setNumber + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {exercisePlan.lift.name}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          value={weight.toString()}
          keyboardType='numeric'
          onChangeText={(value) => setWeight(parseInt(value, 10))}
        />
        <Ionicons
          name='cog-outline'
          size={30}
        />
      </View>
      <Text style={styles.goal}>
        {`Set: ${setNumber} / ${exercisePlan.sets}`}
      </Text>
      <Text style={styles.goal}>
        {`Goal: ${exercisePlan.reps}`}
      </Text>
      <RepSlider
        reps={reps}
        maximumValue={exercisePlan.reps}
        onValueChange={(value) => setReps(value)}
      />
      <Button
        onPress={recordSet}
        title='Record Set'
        color='red'
      />
      {workout && <WorkoutSummary workoutId={workout.id} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    ...BaseStyles.container,
  },
  title: {
    ...TextStyles.title,
  },
  goal: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 4,
  },
  picker: {
    fontSize: 20,
    padding: 5,
    borderColor: 'red',
    borderWidth: 1,
    color: 'red',
  },
});

export default RecordWorkoutScreen;
