import React from 'react';

import { Controller, useForm } from 'react-hook-form';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import TextInputRow from '../components/TextInputRow';
import { BaseStyles, FormStyles } from '../styles';
import { RootStackParamList } from '../types';
import { Program } from '../db/entities/Entities';

type ProgramFormScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProgramForm'
>;

type Props = {
  navigation: ProgramFormScreenNavigationProp;
};

type Inputs = {
  name: string,
};

export default function ProgramFormScreen(props: Props) {
  const { navigation } = props;
  // TODO nonempty + unique validation on name
  const { control, handleSubmit, errors } = useForm<Inputs>();

  // TODO make this a util
  const validation = async (name: string) => {
    const program = await Program.findOne({ name });
    return program === undefined ? true : 'Name must be unique';
  }

  return (
    <View style={styles.container}>
      <TextInputRow
        name='name'
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Program name required'
          },
          validate: validation
        }}
        errors={errors}
      />
      <Button
        title='Add Program'
        onPress={handleSubmit(async (data) => {
          await newProgram(data);
          navigation.pop();
        })}
      />
    </View>
  );
}

async function newProgram(data: Inputs) {
  const program = new Program();
  program.name = data.name;
  await program.save();
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    ...BaseStyles.container
  },
  textInput: {
    ...FormStyles.textInput
  },
});

