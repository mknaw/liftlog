import React, { useState } from 'react';
import { Text } from 'react-native';
import Slider from '@react-native-community/slider';

export default function RepSlider(props) {
  const [reps, setReps] = useState(1);

  const { repGoal } = props;

  return (
    <>
      <Text style={{ fontSize: 20 }}>
        { reps } reps
      </Text>
      <Slider
        style={{width: 200, height: 40}}
        step={1}
        value={reps}
        minimumValue={0}
        // TODO support AMRAP, extra reps?
        maximumValue={repGoal}
        onValueChange={value => setReps(value)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </>
  )
}
