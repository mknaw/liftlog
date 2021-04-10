import React, { useEffect, useState } from 'react';

import { NavigationProp } from '@react-navigation/native';

type NavigationType = {
  // TODO this isn't the right way.
  navigation: NavigationProp<any>;
};

// TODO as it turns out, this is much easier to do with a simple
// custom hook.
function withFetchDetail<T, E>(
  WrappedComponent: React.ComponentType<T>,
  fetchEntity: (
    props: React.ComponentProps<React.ComponentType<T>>,
  ) => Promise<E | undefined>,
) {
  return (
    props: React.ComponentProps<React.ComponentType<T>> & NavigationType,
  ): React.ReactElement => {
    const [entity, setEntity] = useState<E>();

    useEffect(() => {
      const fetch = async () => {
        const fetchedEntity = await fetchEntity(props);
        if (!fetchedEntity) {
          return;
        }
        setEntity(fetchedEntity);
      };

      const { navigation } = props;
      navigation.addListener('focus', () => {
        fetch();
      });
    }, [props]);

    // TODO loading? return None?
    return (
      <WrappedComponent {...props} entity={entity} />
    );
  };
}

export default withFetchDetail;
