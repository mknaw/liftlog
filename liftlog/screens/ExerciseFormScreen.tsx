import React from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as FileSystem from 'expo-file-system';

import { RecordSetScreenProps } from '../types';
import RepSlider from '../components/RepSlider';

import { Lift } from '../db/entities/Entities';
import { createConnection, Connection } from "typeorm";

// TODO validation - React-hooks-form ?

export default class ExerciseFormScreen extends React.Component {
  constructor(props) {
    super(props);
    this.setLift = this.setLift.bind(this);
    const { navigation } = props;
    this.state = {
      weightGoal: '5',
      repGoal: '5',
      // TODO don't like this on load
      lift: '1',
    }
  }

  setLift(lift: string) {
    this.setState({ 'lift': lift });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Add Exercise
        </Text>
        <View style={styles.rowContainer}>
          <Text style={[styles.text, styles.inputLabel]}>Weight goal:</Text>
          <TextInput
            style={styles.text}
            onChangeText={(value) => this.setState({ 'weightGoal': value })}
            value={this.state.weightGoal} />
        </View>
        <View style={styles.rowContainer}>
          <Text style={[styles.text, styles.inputLabel]}>Rep goal:</Text>
          <TextInput
            style={styles.text}
            onChangeText={value => this.setState({ 'weightGoal': value })}
            value={this.state.repGoal} />
        </View>
        <LiftPicker onChange={this.setLift} />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            // insert
            this.props.navigation.navigate('ThisWorkout');
          }}>
          <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


class LiftPicker extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = props.onChange;
    this.state = {
      isLoading: true,
    }
  }

  async componentDidMount() {
    Lift.find().then(lifts => {
      let firstLift = lifts[0].id;
      this.setState({
        isLoading: false,
        lifts: lifts,
        selectedLift: firstLift,
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingText}>
          <Text style={styles.loadingText}>Loading</Text>
        </View>
      );
    } else {
      return (
        <Picker
          style={styles.picker}
          selectedValue={ this.state.selectedLift }
          onValueChange={(itemValue, itemIndex) => {
            this.onChange(itemValue);
            this.setState({ selectedLift: itemValue })
          }}>
          {this.state.lifts.map((row, key) => {
            return (
              <Picker.Item label={row.name} value={row.id} key={key}/>
            );
          })}
        </Picker>
      )
    }
  }
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
  picker: {
    height: 250,
    width: 200,
  },
  loadingText: {
    fontSize: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: 200,
  },
  rowContainer: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  inputLabel: {
    marginRight: 10,
  },
  debugBorder: {
    borderWidth: 2,
    borderColor: 'red',
  },
  btn: {
    margin: 20,
    backgroundColor: '#c8e1ff',
    borderRadius: 2,
  },
});

