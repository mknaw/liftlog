import * as React from 'react';

import { Connection, createConnection } from 'typeorm';

import Exercise from '../db/entities/Exercise';
import Lift from '../db/entities/Lift';
import Program from '../db/entities/Program';
import Workout from '../db/entities/Workout';
import Initial1616335747077 from '../db/migrations/001-Initial';

export default function useConnection(): void {
  const [connection, setConnection] = React.useState<Connection | null>(null);

  const connect = React.useCallback(async () => {
    // TODO how to get this to actually read the config
    const createdConnection = await createConnection({
      type: 'expo',
      database: 'liftlog.db',
      // eslint-disable-next-line
      driver: require('expo-sqlite'),
      // TODO how the fuck to get this to load all from dir
      entities: [Program, Workout, Exercise, Lift],

      migrations: [Initial1616335747077],
      migrationsRun: true,

      synchronize: false,
      logging: true, // TODO set based on dev mode?
    });

    setConnection(createdConnection);
  }, []);

  React.useEffect(() => {
    if (!connection) {
      connect();
    }
  }, [connect, connection]);
}
