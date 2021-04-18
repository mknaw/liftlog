import * as React from 'react';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ColorSchemeName } from 'react-native';

import ExercisePlanFormScreen from '../screens/ExercisePlanFormScreen';
import HomeScreen from '../screens/HomeScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ProgramDetailScreen from '../screens/ProgramDetailScreen';
import ProgramFormScreen from '../screens/ProgramFormScreen';
import ProgramListScreen from '../screens/ProgramListScreen';
import RecordWorkoutScreen from '../screens/RecordWorkoutScreen';
import WorkoutPlanDetailScreen from '../screens/WorkoutPlanDetailScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all
// other content. Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{ title: 'LiftLog' }}
      />
      <Stack.Screen
        name='ProgramList'
        component={ProgramListScreen}
        options={{ title: 'My Programs' }}
      />
      <Stack.Screen
        name='ProgramForm'
        component={ProgramFormScreen}
        options={{ title: 'Add Program' }}
      />
      <Stack.Screen
        name='ProgramDetail'
        component={ProgramDetailScreen}
        options={{ title: 'Program Builder' }}
      />
      <Stack.Screen
        name='WorkoutPlanDetail'
        component={WorkoutPlanDetailScreen}
        options={{ title: 'This Workout Plan' }}
      />
      <Stack.Screen
        name='ExercisePlanForm'
        component={ExercisePlanFormScreen}
        options={{ title: 'Add Exercise' }}
      />
      <Stack.Screen
        name='RecordWorkout'
        component={RecordWorkoutScreen}
        options={{ title: 'Record Workout' }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}
