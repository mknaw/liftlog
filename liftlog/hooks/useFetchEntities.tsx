import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { BaseEntity, FindManyOptions } from 'typeorm';

function useFetchEntities<T extends typeof BaseEntity>(
  entityType: T,
  findOptions?: FindManyOptions,
  fetchOnFocus = true,
): Array<InstanceType<T>> | undefined {

  const [entities, setEntities] = useState<Array<InstanceType<T>>>();

  const navigation = useNavigation();

  useEffect(() => {
    const fetch = async () => {
      const fetchedEntities = await entityType.find(
        findOptions,
      );
      if (fetchedEntities) {
        setEntities(fetchedEntities);
      }
    };
    if (entities === undefined) {
      fetch();
    }
  }, [entities, entityType, findOptions]);

  // TODO kinda dupe city b/w here and useFetchEntities
  useEffect(() => {
    if (fetchOnFocus) {
      navigation.addListener('focus', () => {
        setEntities(undefined);
      });
    }
  }, [fetchOnFocus, navigation]);

  return entities;
}

export default useFetchEntities;
