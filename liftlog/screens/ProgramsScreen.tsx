import React, { useEffect, useState } from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import TextRow from '../components/TextRow';
import { Program } from '../db/entities/Entities';
import { BaseStyles } from '../styles';
import { RootStackParamList } from '../types';

type ProgramsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Programs'
>;

type Props = {
  navigation: ProgramsScreenNavigationProp;
};

const ProgramsScreen: React.FC<Props> = ({ navigation }: Props) => {
  const [programs, setPrograms] = useState<Array<Program>>([]);

  useEffect(() => {
    navigation.addListener('focus', async () => {
      setPrograms(await Program.find());
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      {programs
        ? programs.map((program) => (
          <TextRow
            key={program.id}
            onPress={() => {
              navigation.navigate('ProgramBuilder', { programId: program.id });
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
};

const styles = StyleSheet.create({
  container: {
    ...BaseStyles.container,
  },
});

export default ProgramsScreen;
