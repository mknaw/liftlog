import React, { Component } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { Button, ScrollView, StyleSheet } from 'react-native';

import { BaseStyles } from '../styles';
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
        title='My Programs'
        onPress={() => navigation.navigate('Programs')}
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
    ...BaseStyles.container,
  },
});

