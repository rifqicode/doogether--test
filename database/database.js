const mysql = require('mysql2/promise');
const config = require('../config/config');

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute(sql, params);

  return results;
}

async function queryOneRow(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute(sql, params);

  return results.length > 0 ? results[0] : {};
}

module.exports = {
  query,
  queryOneRow
}