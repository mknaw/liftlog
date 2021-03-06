import { executeSql } from '../database/Database';

import m_0001 from '../database/migrations/m_001';

export default async function() {
  await new Promise(resolve => { setTimeout(resolve, 10000); });
  console.log('resolved');
}
