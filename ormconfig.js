module.exports = {
  'name': 'default',
  'type': 'expo',
  'database': 'db.db',
  'driver': require('expo-sqlite'),
  'synchronize': false,
  'logging': false,
  'entities': [
     'liftlog/db/entity/**/*.ts',
  ],
  'migrations': [
     'liftlog/db/migrations/**/*.ts',
  ],
  'subscribers': [
     'liftlog/db/subscribers/**/*.ts',
  ],
  'cli': {
     'entitiesDir': 'liftlog/db/entities',
     'migrationsDir': 'liftlog/db/migrations',
     'subscribersDir': 'liftlog/db/subscribers',
  }
}
