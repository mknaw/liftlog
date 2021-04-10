import React from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import TextRow from '../components/TextRow';
import { Program } from '../db/entities/Entities';
import withFetchList from '../hocs/withFetchList';
import { BaseStyles } from '../styles';
import { RootStackParamList } from '../types';

type ProgramListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProgramList'
>;

type Props = {
  navigation: ProgramListScreenNavigationProp;
  entities: Array<Program>;
};

const ProgramListScreen: React.FC<Props> = ({
  navigation,
  entities,
}: Props) => (
  <ScrollView style={styles.container}>
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
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    ...BaseStyles.container,
  },
});

export default withFetchList(
  ProgramListScreen,
  () => (Program.find()),
);
