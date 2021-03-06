import React, { Component, useEffect, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

type TextProps = Text['props'];

export default function TextRow(props: TextProps) {

  return (
    <View style={styles.container}>
      <Text style={styles.text} {...props} />
    </View>
  );
}

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

