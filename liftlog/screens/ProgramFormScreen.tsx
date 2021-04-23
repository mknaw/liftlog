import React from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import {
  Button,
  StyleSheet,
  View,
} from 'react-native';

import TextInputRow from '../components/TextInputRow';
import Program from '../db/entities/Program';
import { BaseStyles, FormStyles } from '../styles';
import { MainStackParamList } from '../types';

type ProgramFormScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ProgramForm'
>;

type Props = {
  navigation: ProgramFormScreenNavigationProp;
};

type Inputs = {
  name: string,
};

async function newProgram(data: Inputs) {
  const program = new Program();
  program.name = data.name;
  await program.save();
}

const ProgramFormScreen: React.FC<Props> = ({ navigation }: Props) => {
  // TODO nonempty + unique validation on name
  const { control, handleSubmit, errors } = useForm<Inputs>();

  // TODO make this a util
  const validation = async (name: string) => {
    const program = await Program.findOne({ name });
    return program === undefined ? true : 'Name must be unique';
  };

  return (
    <View style={styles.container}>
      <TextInputRow
        name='name'
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Program name required',
          },
          validate: validation,
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
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    ...BaseStyles.container,
  },
  textInput: {
    ...FormStyles.textInput,
  },
});

export default ProgramFormScreen;
