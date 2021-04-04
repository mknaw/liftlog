import React from 'react';

import { Control, Controller } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Colors, FormStyles, TextStyles } from '../styles';
import { TextUtils } from '../utils';

type Props = {
  control: Control,
  name: string,
  label?: string,
  rules?: Object,
  // TODO probably not orthodox but dunno enough about TS to do better
  errors?: Record<string, any>,
};

const TextInputRow: React.FC<Props> = ({
  control,
  name,
  errors,
  rules,
  label = TextUtils.camelToTitle(name),
}: Props) => (
  <View style={styles.container}>
    {errors && name in errors && (
      <Text>{errors[name].message}</Text>
    )}
    <Text style={styles.label}>
      { label }
    </Text>
    <Controller
      name={name}
      control={control}
      defaultValue=''
      rules={rules}
      render={({ onChange, value }) => (
        <TextInput
          onChangeText={(text) => onChange(text)}
          value={value}
          style={styles.textInput}
        />
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 12,
    borderBottomColor: Colors.darkGray,
    borderBottomWidth: 1,
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
