import React from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import { Button, StyleSheet, View } from 'react-native';

import { BaseStyles } from '../styles';
import { MainStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }: Props) => (
  <View style={styles.container}>
    <Button
      title='My Programs'
      onPress={() => navigation.navigate('ProgramList')}
    />
    <Button
      title='Workout History'
      onPress={() => navigation.navigate('WorkoutHistory')}
    />
    <Button
      title='Settings'
      onPress={() => null}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...BaseStyles.container,
  },
});

export default HomeScreen;
