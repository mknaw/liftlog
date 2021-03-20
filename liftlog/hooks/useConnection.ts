import * as React from 'react';
import { Connection, createConnection } from 'typeorm';

import { Exercise } from '../db/entities/Exercise';
import { Lift } from '../db/entities/Lift';
import { Workout } from '../db/entities/Workout';

import { CreateLiftsTable1616335747077 } from '../db/migrations/1616335747077-CreateLiftsTable';

export default function useConnection() {
  const [connection, setConnection] = React.useState<Connection | null>(null);

  const connect = React.useCallback(async () => {
    // TODO how to get this to actually read the config
    const createdConnection = await createConnection({
      type: 'expo',
      database: 'db.db',
      driver: require('expo-sqlite'),
      // TODO how the fuck to get this to load all from dir
      entities: [Workout, Exercise, Lift],

      migrations: [CreateLiftsTable1616335747077],
      migrationsRun: true,

      synchronize: false,
      logging: true,  // TODO set based on dev mode?
    });

    setConnection(createdConnection);
  }, []);

  React.useEffect(() => {
    if (!connection) {
      connect();
    }
  }, [connect, connection]);
}
