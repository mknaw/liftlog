import React from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import TextRow from '../components/TextRow';
import Program from '../db/entities/Program';
import useFetchEntities from '../hooks/useFetchEntities';
import { BaseStyles } from '../styles';
import { MainStackParamList } from '../types';

type ProgramListScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ProgramList'
>;

type Props = {
  navigation: ProgramListScreenNavigationProp;
};

const ProgramListScreen: React.FC<Props> = ({
  navigation,
}: Props) => {
  const entities = useFetchEntities(Program);

  if (!entities) {
    return null;
  }
  return (
    <View style={styles.container}>
      {entities
        ? entities.map((program) => (
          <TextRow
            key={program.id}
            onPress={() => {
              navigation.navigate('ProgramDetail', { entityId: program.id });
            }}
          >
            { program.name }
          </TextRow>
        )) : <Text>No programs yet</Text>}
      <Button
        title='Add Program'
        onPress={() => navigation.navigate('ProgramForm')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...BaseStyles.container,
  },
});

export default ProgramListScreen;
