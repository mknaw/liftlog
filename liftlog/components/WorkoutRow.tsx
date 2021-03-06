import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Row } from 'react-native-table-component';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core';

export interface Props {
  liftName: string;
  weight: number;
  reps: number;
}

// TODO this pattern is ugly as fuck, surely there's a better way.
export interface DeFactoProps extends Props {
  // TODO not sure that `object` is really the right type here.
  navigation: object;
}

function WorkoutRow(props: DeFactoProps) {
  let rowData = [
    liftButton(props),
    props.weight,
    props.reps,
  ];

  return (
     <Row data={rowData} style={styles.cell} textStyle={styles.text} />
  );
}

function liftButton(props: DeFactoProps) {
  const { navigation, liftName, weight, reps } = props;
  const onPress = () => {
    // TODO property `navigate` doesn't exist on `object`
    navigation.navigate('RecordSet', {
      // TODO should just pass exercises ID
      liftName, weight, reps,
    })
  };

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnText}>{ liftName }</Text>
    </TouchableOpacity>
  );
}


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

// Wrap with navigation and export
export default function(props: Props) {
  const navigation = useNavigation();
  return <WorkoutRow {...props} navigation={navigation}/>;
}
