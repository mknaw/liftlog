import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import RecordSetScreen from '../screens/RecordSetScreen';
import ThisWorkoutScreen from '../screens/ThisWorkoutScreen';
import { BottomTabParamList, RecordSetParamList, ThisWorkoutParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="ThisWorkout"
        component={ThisWorkoutNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="today" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="RecordSet"
        component={RecordSetNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-recording" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ThisWorkoutStack = createStackNavigator<ThisWorkoutParamList>();

function ThisWorkoutNavigator() {
  return (
    <ThisWorkoutStack.Navigator>
      <ThisWorkoutStack.Screen
        name="ThisWorkoutScreen"
        component={ThisWorkoutScreen}
        options={{ headerTitle: 'This Workout' }}
      />
    </ThisWorkoutStack.Navigator>
  );
}

const RecordSetStack = createStackNavigator<RecordSetParamList>();

function RecordSetNavigator() {
  return (
    <RecordSetStack.Navigator>
      <RecordSetStack.Screen
        name="RecordSetScreen"
        component={RecordSetScreen}
        options={{ headerTitle: 'Record Set' }}
      />
    </RecordSetStack.Navigator>
  );
}

