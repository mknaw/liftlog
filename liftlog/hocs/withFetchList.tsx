import React, { useEffect, useState } from 'react';

import { NavigationProp } from '@react-navigation/native';

type NavigationType = {
  // TODO this isn't the right way.
  navigation: NavigationProp<any>;
};

// TODO as it turns out, this is much easier to do with a simple
// custom hook.
function withFetchList<T, E>(
  WrappedComponent: React.ComponentType<T>,
  fetchEntities: () => Promise<Array<E> | undefined>,
) {
  return (
    props: React.ComponentProps<React.ComponentType<T>> & NavigationType,
  ): React.ReactElement => {
    const [entities, setEntities] = useState<Array<E>>();
    const { navigation } = props;

    useEffect(() => {
      const fetch = async () => {
        const fetchedEntities = await fetchEntities();
        if (!fetchedEntities) {
          return;
        }
        setEntities(fetchedEntities);
      };

      navigation.addListener('focus', () => {
        fetch();
      });
    }, [navigation]);

    // TODO loading? return None?
    return (
      <WrappedComponent {...props} entities={entities} />
    );
  };
}

export default withFetchList;
