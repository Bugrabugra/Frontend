const pg = require("pg");

// postgresql
const Pool = pg.Pool;
const pool = new Pool({
  user: "postgres",
  host: 'localhost',
  database: 'postgres',
  password: '66304736',
  port: 5432,
});

const getFeatures = (req, res) => {
  const layer = req.query.layer;
  const filter = req.query.filter;

  pool.query(filter ? `select ST_AsGeoJSON(geom) as geometry, * from ${layer} where ${filter}` : `select ST_AsGeoJSON(geom) as geometry, * from ${layer}`, (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
};

const getFields = (req, res) => {
  const layer = req.query.layer;

  pool.query(`select column_name from information_schema.columns where table_name = '${layer}'`, (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
};

const getUniqueValues = (req, res) => {
  const layer = req.query.layer;
  const field = req.query.field;

  pool.query(`select distinct(${field}) from ${layer} order by ${field}`, (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
};

module.exports = {
  getFeatures,
  getFields,
  getUniqueValues
}