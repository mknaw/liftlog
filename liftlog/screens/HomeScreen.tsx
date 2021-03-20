import React, { Component } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { Button, ScrollView, StyleSheet } from 'react-native';

import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen(props: Props) {
  const { navigation } = props;
  return (
    <ScrollView style={styles.container}>
      <Button
        title='My Workouts'
        onPress={() => navigation.navigate('Workouts')}
      />
      <Button
        title='Settings'
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

