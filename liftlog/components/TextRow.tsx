import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

type Props = Text['props'];

const TextRow: React.FC<Props> = (props: Props) => (
  <View style={styles.container}>
    <Text style={styles.text} {...props} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default TextRow;
