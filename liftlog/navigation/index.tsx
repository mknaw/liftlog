import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import HomeScreen from '../screens/HomeScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import ProgramFormScreen from '../screens/ProgramFormScreen';
import ProgramBuilderScreen from '../screens/ProgramBuilderScreen';
import ThisWorkoutScreen from '../screens/ThisWorkoutScreen';
import ExerciseFormScreen from '../screens/ExerciseFormScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import RecordSetScreen from '../screens/RecordSetScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
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
        name='Programs'
        component={ProgramsScreen}
        options={{ title: 'My Programs' }}
      />
      <Stack.Screen
        name='ProgramForm'
        component={ProgramFormScreen}
        options={{ title: 'Add Program' }}
      />
      <Stack.Screen
        name='ProgramBuilder'
        component={ProgramBuilderScreen}
        options={{ title: 'Program Builder' }}
      />
      <Stack.Screen
        name='ThisWorkout'
        component={ThisWorkoutScreen}
        options={{ title: 'This Workout' }}
      />
      <Stack.Screen
        name='ExerciseForm'
        component={ExerciseFormScreen}
        options={{ title: 'Add Exercise' }}
      />
      <Stack.Screen
        name='RecordSet'
        component={RecordSetScreen}
        options={{ title: 'Record Set' }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}
