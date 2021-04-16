import React, { useState } from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import RepSlider from '../components/RepSlider';
import Exercise from '../db/entities/Exercise';
import useFetchEntity from '../hooks/useFetchEntity';
import { BaseStyles, TextStyles } from '../styles';
import { RootStackParamList } from '../types';

type RecordSetRouteProp = RouteProp<
  RootStackParamList,
  'RecordSet'
>;

type RecordSetNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RecordSet'
>;

type Props = {
  route: RecordSetRouteProp;
  navigation: RecordSetNavigationProp;
};

const RecordSetScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const { entityId } = route.params;
  const entity = useFetchEntity(Exercise, entityId);

  const [setNumber, setSetNumber] = useState(1);

  if (!entity) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {`${entity.lift.name} - ${entity.weight} lbs.`}
      </Text>
      <Text style={styles.goal}>
        {`Goal: ${entity.reps}`}
      </Text>
      <Text style={styles.goal}>
        {`Set: ${setNumber}`}
      </Text>
      <RepSlider repGoal={entity.reps} />
      <Button
        onPress={() => {
          if (setNumber > entity.reps) {
            navigation.navigate(
              'WorkoutDetail',
              { entityId: entity.workout.id },
            );
          } else {
            setSetNumber(setNumber + 1);
          }
        }}
        title='Record Set'
        color='red'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    ...BaseStyles.container,
  },
  title: {
    ...TextStyles.title,
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

export default RecordSetScreen;
