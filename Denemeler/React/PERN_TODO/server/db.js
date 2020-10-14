const config = require("../config/default");
const Pool  = require('pg').Pool;

const pool = new Pool({
  user: config.user,
  password: config.password,
  host: config.host,
  port: config.port,
  database: config.database
});

module.exports = pool;