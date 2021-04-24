import React from 'react';

// eslint-disable-next-line camelcase
import { useFonts, Orbitron_700Bold } from '@expo-google-fonts/orbitron';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = {
  time: number | undefined;
};

const Timer: React.FC<Props> = ({ time }: Props) => {

  const [fontsLoaded] = useFonts({
    Orbitron_700Bold,
  });

  const format = (t: number): string => {
    const minutes = Math.floor(t / 60);
    const seconds = t - 60 * minutes;
    const minutesDisplay = `${minutes}`.padStart(2, '0');
    const secondsDisplay = `${seconds}`.padStart(2, '0');
    return `${minutesDisplay}:${secondsDisplay}`;
  };

  if (time === undefined || !fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {format(time)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 180,
  },
  text: {
    // TODO not actually monospaced...
    fontFamily: 'Orbitron_700Bold',
    fontSize: 50,
  },
});

export default Timer;
