import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { BaseEntity, FindOneOptions } from 'typeorm';

function useFetchEntity<T extends typeof BaseEntity>(
  entityType: T,
  entityId: number,
  extraFindOptions?: FindOneOptions,
  fetchOnFocus = true,
): InstanceType<T> | undefined {

  const [entity, setEntity] = useState<InstanceType<T>>();

  const navigation = useNavigation();

  useEffect(() => {
    const fetch = async () => {
      const fetchedEntity = await entityType.findOneOrFail(
        entityId,
        extraFindOptions,
      );
      if (fetchedEntity) {
        setEntity(fetchedEntity);
      }
    };
    if (!entity) {
      fetch();
    }
  }, [entity, entityType, entityId, extraFindOptions]);

  // TODO kinda dupe city b/w here and useFetchEntities
  useEffect(() => {
    if (fetchOnFocus) {
      navigation.addListener('focus', () => {
        setEntity(undefined);
      });
    }
  }, [fetchOnFocus, navigation]);

  return entity;
}

export default useFetchEntity;
