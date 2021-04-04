import React, { useState } from 'react';

import Slider from '@react-native-community/slider';
import { Text } from 'react-native';

type Props = {
  repGoal: number,
};

const RepSlider: React.FC<Props> = ({ repGoal }: Props) => {
  const [reps, setReps] = useState(1);

  return (
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
        maximumValue={repGoal}
        onValueChange={(value) => setReps(value)}
        minimumTrackTintColor='#FFFFFF'
        maximumTrackTintColor='#000000'
      />
    </>
  );
};

export default RepSlider;
