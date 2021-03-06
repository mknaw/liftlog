
import { executeSql } from '../Database';


export default async function() {
  executeSql(
    `create table migrations if not exists(
      id integer primary key autoincrement, 
      timeApplied integer not null
    );`, []);
  executeSql(
    `create table lifts if not exists(
      id integer primary key autoincrement, 
      name text not null
    );`, []);
  executeSql(
    `create table lifts if not exists(
      id integer primary key autoincrement, 
      lift integer not null,
      repGoal integer,
      weightGoal integer not null,
    );`, []);
}
