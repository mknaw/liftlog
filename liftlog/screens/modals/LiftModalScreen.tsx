import React from 'react';

import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Lift from '../../db/entities/Lift';
import useFetchEntities from '../../hooks/useFetchEntities';
import { TextStyles } from '../../styles';
import { MainStackParamList, RootStackParamList } from '../../types';

type LiftModalNavigationProp = CompositeNavigationProp<
  StackNavigationProp<
    RootStackParamList,
    'LiftModal'
  >,
  StackNavigationProp<MainStackParamList>
>;

type Props = {
  navigation: LiftModalNavigationProp;
};

type LiftListItemProps = {
  item: Lift;
  navigation: LiftModalNavigationProp;
}

const LiftListItem = ({ item, navigation }: LiftListItemProps) => {
  const { name } = item;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(
          'ExercisePlanForm',
          { selectedLiftId: item.id },
        );
      }}
    >
      <Text style={styles.text}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

// TODO should split out a base modal
const LiftModalScreen: React.FC<Props> = ({ navigation }: Props) => {
  const lifts = useFetchEntities(Lift);

  if (!lifts) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <View style={styles.container}>
        <FlatList
          data={lifts}
          renderItem={({ item }) => (
            <LiftListItem
              item={item}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '85%',
    borderRadius: 25,
    backgroundColor: 'orange',
    padding: 25,
  },
  text: {
    color: 'white',
    paddingVertical: 5,
    ...TextStyles.medium,
  },
});

export default LiftModalScreen;
