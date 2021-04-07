import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Row } from 'react-native-table-component';

import { Exercise } from '../db/entities/Entities';

export interface Props {
  exercise: Exercise;
}

const liftButton: React.FC<Props> = ({ exercise }: Props) => {
  const navigation = useNavigation();

  const onPress = () => {
    // TODO property `navigate` doesn't exist on `object`
    navigation.navigate(
      'RecordSet',
      { exerciseId: exercise.id },
    );
  };

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnText}>{ exercise.lift.name }</Text>
    </TouchableOpacity>
  );
};

const WorkoutRow: React.FC<Props> = ({ exercise }: Props) => {
  const rowData = [
    liftButton({ exercise }),
    exercise.weight,
    exercise.sets,
    exercise.reps,
  ];

  return (
    <Row
      data={rowData}
      style={styles.cell}
      textStyle={styles.text}
    />
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderColor: '#c8e1ff',
  },
  text: {
    color: 'black',
    margin: 6,
    textAlign: 'center',
  },
  btn: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#c8e1ff',
    borderRadius: 2,
  },
  btnText: {
    textAlign: 'center',
  },
});

export default WorkoutRow;
