import React, { Component } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { Button, ScrollView, StyleSheet, Text } from 'react-native';

import { RootStackParamList } from '../types';

type WorkoutsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Workouts'
>;

type Props = {
  navigation: WorkoutsScreenNavigationProp;
};

export default function WorkoutsScreen(props: Props) {
  const { navigation } = props;
  return (
    <ScrollView style={styles.container}>
      <Text>Workouts go here...</Text>
      <Button
        title='Add workout'
        onPress={() => {
          navigation.navigate('WorkoutForm');
        }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

