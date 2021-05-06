import React, { useEffect, useState } from 'react';

import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
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
  const [filteredLifts, setFilteredLifts] = useState<Array<Lift>>([]);
  const [searchText, onChangeSearchText] = useState<string>();

  useEffect(() => {
    if (!lifts) {
      return;
    }
    const liftFilter = ((thisLift: Lift) => (
      searchText
        ? thisLift.name.toLowerCase().includes(searchText.toLowerCase())
        : true
    ));
    setFilteredLifts(lifts.filter(liftFilter));
  }, [lifts, searchText]);

  const onAddLiftPress = async () => {
    if (!searchText) {
      return;
    }
    const newLift = new Lift();
    newLift.name = searchText;
    await newLift.save();
    navigation.navigate(
      'ExercisePlanForm',
      { selectedLiftId: newLift.id },
    );
  };

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
        <TextInput
          style={[styles.textInput, styles.midlight]}
          placeholder='Search'
          onChangeText={onChangeSearchText}
        />
        {filteredLifts.length
          ? (
            <FlatList
              data={filteredLifts}
              renderItem={({ item }) => (
                <LiftListItem
                  item={item}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item) => `${item.id}`}
            />
          )
          : (
            <TouchableOpacity
              style={styles.addLift}
              onPress={onAddLiftPress}
            >
              <Text style={[styles.text, styles.midlight, { color: 'black' }]}>
                Add to lifts
              </Text>
            </TouchableOpacity>
          )}
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
  midlight: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  textInput: {
    paddingVertical: 5,
    ...TextStyles.medium,
  },
  addLift: {
    marginVertical: 10,
  },
});

export default LiftModalScreen;
