import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          IntraSet: {
            screens: {
              IntraSetScreen: 'recordset',
            },
          },
          ThisWorkout: {
            screens: {
              ThisWorkoutScreen: 'thisworkout',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
