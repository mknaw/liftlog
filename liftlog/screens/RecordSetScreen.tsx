import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as FileSystem from 'expo-file-system';

import { RecordSetScreenProps } from '../types';
import RepSlider from '../components/RepSlider';
import { openDatabase } from '../database/Database';

export default function RecordSetScreen({ route, navigation }) {

  // TODO Don't think this is how it is done
  // Think this is related to incorrect use of `RecordSetScreen`
  // in `WorkoutRow.tsx`
  const { liftName } = route.params ? route.params : 'unknown';
  const { weightGoal } = route.params ? route.params : 'unknown';
  const { repGoal } = route.params ? route.params : 'unknown';

  const [setNumber, setSetNumber] = React.useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        { liftName } - { weightGoal } lbs.
      </Text>
      <Text style={styles.goal}>Goal: { repGoal }</Text>
      <Text style={styles.goal}>
        Set: { setNumber }
      </Text>
      <RepSlider repGoal={repGoal} />
      <Button
        onPress={() => {
          if ( setNumber > repGoal ) {
            navigation.navigate('ThisWorkout');
          } else {
            setSetNumber( setNumber + 1 );
          }
        }}
        title='Record Set'
        color='red'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 4,
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
