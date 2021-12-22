'use strict';

const config = require('../../config');

module.exports = ({
  pg: { Pool },
  loggingService,
}) =>{
  const pool = new Pool({
    user: config.postgreSQL.user,
    host: config.postgreSQL.host,
    database: config.postgreSQL.database,
    password: config.postgreSQL.password,
    port: config.postgreSQL.port,
  });

  function buildInsertQuery(table, row) {
    const fieldsArray = Object.keys(row).filter(key => row[key]);
    const templateString = fieldsArray.map((__, idx) => `$${idx + 1}`).join(', ');
    return {
      sql: `INSERT INTO ${table} (${ fieldsArray.join(', ') }) VALUES (${templateString})`,
      params: fieldsArray.map(key => row[key]),
    };
  }

  function buildUpdateQuery(table, keys, row) {
    const fieldsArray = Object.keys(row).filter(key => row[key]);
    const updateString = fieldsArray.map((field, idx) => `${field} = $${idx + 1}`).join(', ');
    const conditionString = Object.keys(keys).map((field, idx) => `${field} = $${fieldsArray.length + idx + 1}`).join(' AND ');

    return {
      sql: `UPDATE ${table} SET ${ updateString } WHERE (${conditionString})`,
      params: fieldsArray.map(key => row[key]).concat(Object.keys(keys).map(key => keys[key])),
    };
  }

  return {
    pool,
    async query({ sql, params = [] }) {
      try {
        return await pool.query(sql, params);
      } catch (error) {
        loggingService.error(__filename, 'query', error);
        throw error;
      }
    },

    async insert(table, rows) {
      if (!rows || !rows.length) { throw new Error('No rows to be inserted'); }

      for (const row of rows) {
        await this.query(buildInsertQuery(table, row));
      }
    },

    async updateByFields(table, keys, object) {
      return this.query(buildUpdateQuery(table, keys, object));
    },

    async checkConnection() {
      return await this.query('SELECT 1');
    },
  };
};
