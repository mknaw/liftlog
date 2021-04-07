import React, { useEffect, useState } from 'react';

import { Picker } from '@react-native-picker/picker';
import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { Lift } from '../db/entities/Entities';

type Props = {
  control: Control,
  name: string,
};

const LiftPicker: React.FC<Props> = ({ control, name }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lifts, setLifts] = useState<Array<Lift>>([]);
  const [selectedLiftId, setSelectedLiftId] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedLifts = await Lift.find();
      setLifts(fetchedLifts);
      setSelectedLiftId(fetchedLifts[0].id);
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
      defaultValue={selectedLiftId}
      render={({ onChange }) => (
        <Picker
          style={styles.picker}
          selectedValue={selectedLiftId}
          onValueChange={(liftId) => {
            onChange(liftId);
            setSelectedLiftId(Number(liftId));
          }}
        >
          {lifts.map((row) => (
            <Picker.Item label={row.name} value={row.id} key={row.id} />
          ))}
        </Picker>
      )}
    />
  );
};

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

export default LiftPicker;
