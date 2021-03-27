import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { Button, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View } from 'react-native';

import { RootStackParamList } from '../types';
import { Lift } from '../db/entities/Entities';

// TODO validation - React-hooks-form ?

type WorkoutFormScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WorkoutForm'
>;

type Props = {
  navigation: WorkoutFormScreenNavigationProp;
};

export default function WorkoutFormScreen(props: Props) {
  const { navigation } = props;
  return (
    <ScrollView style={styles.container}>
      <TextInput value='foo' />
      <Button
        title='Add Workout'
        onPress={() => {}}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

