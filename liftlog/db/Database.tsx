
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

const pathToDatabaseFile = '../assets/db/liftlog.db';

export async function openDatabase() {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  const fileUri = FileSystem.documentDirectory + 'SQLite/db.db';
  const fileInfo = await FileSystem.getInfoAsync(fileUri);

  if (!fileInfo.exists) {
    // TODO this approach won't get very far -
    // can't easily migrate existing user dbs to include new cols, etc.
    await FileSystem.downloadAsync(
      Asset.fromModule(require(pathToDatabaseFile)).uri, fileUri);
  }
  return SQLite.openDatabase('db.db');
}

const commaJoin = (array: string[]) => array.join(', ');

const columnSelectionString = (array: string[]) => {
  // Helper fn for generating column selection strings for sql queries.
  if (array === undefined || array.length === 0) {
    return '*';
  } else {
    return commaJoin(array);
  }
};

// Helper fn for generating '?, ?, ?, ...' placeholder strings for sql queries.
const placeholderString = (array: string[]) => [...array].map(() => '?').join(', ');

export async function executeSql(sql: string, params: []) {
  let db = await openDatabase();
  return new Promise((txResolve, txReject) => {
    db.transaction(tx => {
      return new Promise((sqlResolve, sqlReject) => {
        tx.executeSql(
          sql,
          params,
          (_, { rows }) => sqlResolve( rows._array ),
          (_, error) => console.log(error)
        )
      }).then(txResolve).catch(txReject)
    })
  })
}

export async function selectAll(fromTable: string) {
  return executeSql(`SELECT * FROM ${ fromTable };`, []);
}

export async function selectWhere(fromTable: string, cols: [], wheres: {}) {
  const makeWhereQuery = (w: Object) => {
    let whereQueries: string[] = [];
    for (const [key, value] of Object.entries(wheres)) {
      whereQueries.push(`${key} = ${value}`);
    }
    return commaJoin(whereQueries);
  };
  const colQuery = columnSelectionString(cols);
  const whereQuery = makeWhereQuery(wheres);
  // FIXME think this stuff should actually be placeholdered + passed via the `executeSql` params
  return executeSql(`SELECT ${colQuery} FROM ${fromTable} WHERE ${whereQuery};`, []);
}

export async function insert(intoTable: string, data: {}) {
  return executeSql(
    `INSERT INTO ${intoTable} ` +
    `(${columnSelectionString(Object.keys(data))}) ` +
    `VALUES (${placeholderString(Object.keys(data))});`,
    Object.values(data));
}

