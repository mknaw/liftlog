import React from 'react';

import { Controller, FieldErrors, UseControllerOptions } from 'react-hook-form';
import {
  KeyboardType,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Colors, FormStyles, TextStyles } from '../styles';
import { TextUtils } from '../utils';

type Props = {
  label?: string,
  // TODO probably not orthodox but dunno enough about TS to do better
  errors?: FieldErrors,
  keyboardType?: KeyboardType,
} & UseControllerOptions & TextInput['props'];

const TextInputRow: React.FC<Props> = ({
  control,
  name,
  errors,
  rules,
  label = TextUtils.camelToTitle(name),
  ...textInputProps
}: Props) => (
  <View style={styles.container}>
    {errors && name in errors && (
      <Text style={styles.error}>
        {errors[name].message}
      </Text>
    )}
    <View style={styles.innerContainer}>
      <Text style={styles.label}>
        { label }
      </Text>
      <Controller
        name={name}
        control={control}
        defaultValue={textInputProps.defaultValue || ''}
        rules={rules}
        render={({ onChange, value }) => (
          <TextInput
            onChangeText={(text) => onChange(text)}
            value={value}
            style={styles.textInput}
            {...textInputProps}
          />
        )}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    padding: 12,
    borderBottomColor: Colors.darkGray,
    borderBottomWidth: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  error: {
    marginBottom: 4,
    color: 'red',
  },
  label: {
    marginRight: 10,
    ...TextStyles.medium,
  },
  textInput: {
    flex: 1,
    ...TextStyles.medium,
    ...FormStyles.textInput,
  },
});

export default TextInputRow;
