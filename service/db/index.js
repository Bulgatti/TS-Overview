const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PW,
  port: process.env.DBPORT,
});

module.exports = db;
