require("dotenv").config();
const pg = require("pg");


const Pool = pg.Pool;
const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});


module.exports = db;