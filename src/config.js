'use strict';

require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  protocol: process.env.PROTOCOL || 'http',
  logLevel: process.env.LOG_LEVEL || 'debug',
  postgreSQL: {
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
  },
  swagger:{
    options: {
      info: {
        title: 'Test Service API Documentation',
        version: 'latest',
      },
    },
  },
};
