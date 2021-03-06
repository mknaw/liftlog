import React, { useEffect, useState } from 'react';

import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Lift } from '../db/entities/Entities';

type Props = {
  control: Control,
  name: string,
};

export default function LiftPicker(props: Props) {

  const { control, name } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lifts, setLifts] = useState<Array<Lift>>([]);
  const [selectedLiftId, setSelectedLiftId] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      const lifts = await Lift.find();
      setLifts(lifts);
      setSelectedLiftId(lifts[0].id);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingText}>
        <Text style={styles.loadingText}>Loading</Text>
      </View>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ onChange, value }) => (
        <Picker
          style={styles.picker}
          selectedValue={ selectedLiftId }
          onValueChange={liftId => {
            onChange(liftId)
            setSelectedLiftId(Number(liftId));
          }}>
          {lifts.map((row, key) => {
            return (
              <Picker.Item label={row.name} value={row.id} key={key}/>
            );
          })}
        </Picker>
      )} />
  )
}

const styles = StyleSheet.create({
  picker: {
    height: 250,
    width: 200,
  },
  loadingText: {
    fontSize: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: 200,
  },
});

