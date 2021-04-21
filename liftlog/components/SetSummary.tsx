import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import Set from '../db/entities/Set';
import { TextStyles } from '../styles';

type Props = {
  sett: Set,
};

const SetSummary: React.FC<Props> = ({ sett }: Props) => {

  if (!sett) {
    return null;
  }

  let text = sett.exercise.lift.name;
  text += `\n${sett.reps} x ${sett.weight}`;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'orange',
    paddingHorizontal: 10,
    paddingVertical: 7,
    margin: 5,
    borderRadius: 5,
  },
  text: {
    // TODO these should be from a common style
    color: 'white',
    ...TextStyles.medium,
  },
});

export default SetSummary;
