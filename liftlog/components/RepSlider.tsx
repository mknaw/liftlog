import React from 'react';

import Slider from '@react-native-community/slider';
import { Text } from 'react-native';

type Props = {
  reps: number;
  maximumValue: number;
  onValueChange: (v: number) => void;
};

const RepSlider: React.FC<Props> = ({
  reps,
  maximumValue,
  onValueChange,
}: Props) => (
  <>
    <Text style={{ fontSize: 20 }}>
      { `${reps} reps` }
    </Text>
    <Slider
      style={{ width: 200, height: 40 }}
      step={1}
      value={reps}
      minimumValue={0}
      // TODO support AMRAP, extra reps?
      minimumTrackTintColor='#FFFFFF'
      maximumTrackTintColor='#000000'
      maximumValue={maximumValue}
      onValueChange={onValueChange}
    />
  </>
);

export default RepSlider;
