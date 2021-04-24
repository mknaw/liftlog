import React from 'react';

import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import useConnection from './hooks/useConnection';
import Navigation from './navigation';

export default function App() {
  const [isLoadingComplete, setIsLoadingComplete] = React.useState(false);

  // TODO this stuff should be in `prepare` probably
  useCachedResources();
  const colorScheme = useColorScheme();
  const connection = useConnection();

  React.useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoadingComplete(true);
        // TODO supposedly better to do this once we know the root view
        // has already performed layout.
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
