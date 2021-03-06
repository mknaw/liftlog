import * as React from 'react';

import * as SQLite from 'expo-sqlite';
import { Connection, createConnection } from 'typeorm';

import Exercise from '../db/entities/Exercise';
import ExercisePlan from '../db/entities/ExercisePlan';
import Lift from '../db/entities/Lift';
import Program from '../db/entities/Program';
import Set from '../db/entities/Set';
import Workout from '../db/entities/Workout';
import WorkoutPlan from '../db/entities/WorkoutPlan';
import Initial1616335747077 from '../db/migrations/001-Initial';

export default function useConnection(): void {
  const [connection, setConnection] = React.useState<Connection | null>(null);

  const connect = React.useCallback(async () => {
    const database = 'liftlog.db';
    const createdConnection = await createConnection({
      type: 'expo',
      database,
      // eslint-disable-next-line
      driver: require('expo-sqlite'),
      // TODO how the fuck to get this to load all from dir
      entities: [
        Program,
        WorkoutPlan,
        Workout,
        ExercisePlan,
        Exercise,
        Lift,
        Set,
      ],

      migrations: [Initial1616335747077],
      migrationsRun: true,

      synchronize: false,
      logging: true, // TODO set based on dev mode?
    });

    // Need to do this for FKs to work correctly I guess (e.g. cascades).
    SQLite.openDatabase(database).exec(
      [{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => null,
    );

    setConnection(createdConnection);
  }, []);

  React.useEffect(() => {
    if (!connection) {
      connect();
    }
  }, [connect, connection]);
}
