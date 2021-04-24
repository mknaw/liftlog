import * as React from 'react';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { ColorSchemeName } from 'react-native';

import ExercisePlanFormScreen from '../screens/ExercisePlanFormScreen';
import HomeScreen from '../screens/HomeScreen';
import LiftModalScreen from '../screens/modals/LiftModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ProgramDetailScreen from '../screens/ProgramDetailScreen';
import ProgramFormScreen from '../screens/ProgramFormScreen';
import ProgramListScreen from '../screens/ProgramListScreen';
import RecordWorkoutScreen from '../screens/RecordWorkoutScreen';
import WorkoutHistoryScreen from '../screens/WorkoutHistoryScreen';
import WorkoutPlanDetailScreen from '../screens/WorkoutPlanDetailScreen';
import { MainStackParamList, RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

type NavigationProps = {
  colorScheme: ColorSchemeName,
}

export default ({ colorScheme }: NavigationProps): React.ReactElement => (
  <NavigationContainer
    linking={LinkingConfiguration}
    theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
  >
    <RootNavigator />
  </NavigationContainer>
);

const MainStack = createStackNavigator<MainStackParamList>();

function MainNavigator() {
  return (
    <MainStack.Navigator
      initialRouteName='Home'
      headerMode='float'
      screenOptions={{ headerShown: true }}
    >
      <MainStack.Screen
        name='Home'
        component={HomeScreen}
        options={{ title: 'LiftLog' }}
      />
      <MainStack.Screen
        name='ProgramList'
        component={ProgramListScreen}
        options={{ title: 'My Programs' }}
      />
      <MainStack.Screen
        name='ProgramForm'
        component={ProgramFormScreen}
        options={{ title: 'Add Program' }}
      />
      <MainStack.Screen
        name='ProgramDetail'
        component={ProgramDetailScreen}
        options={{ title: 'Program Builder' }}
      />
      <MainStack.Screen
        name='WorkoutPlanDetail'
        component={WorkoutPlanDetailScreen}
        options={{
          title: 'This Workout Plan',
          headerLeft: () => null,
        }}
      />
      <MainStack.Screen
        name='ExercisePlanForm'
        component={ExercisePlanFormScreen}
        options={{ title: 'Add Exercise' }}
      />
      <MainStack.Screen
        name='RecordWorkout'
        component={RecordWorkoutScreen}
        options={{ title: 'Record Workout' }}
      />
      <MainStack.Screen
        name='WorkoutHistory'
        component={WorkoutHistoryScreen}
        options={{ title: 'Workout History' }}
      />
      <MainStack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </MainStack.Navigator>
  );
}

const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator
      mode='modal'
      headerMode='none'
      screenOptions={{
        cardStyle: {
          backgroundColor: 'transparent',
        },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ ...args }) => {
          // All this work to have a simple dim overlay ...
          const { current } = args;
          const { progress } = current;
          const style = CardStyleInterpolators.forVerticalIOS(args);
          style.overlayStyle = {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.2],
              extrapolate: 'clamp',
            }),
          };
          return style;
        },
      }}
    >
      <RootStack.Screen
        name='Main'
        component={MainNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name='LiftModal'
        component={LiftModalScreen}
      />
    </RootStack.Navigator>
  );
}
