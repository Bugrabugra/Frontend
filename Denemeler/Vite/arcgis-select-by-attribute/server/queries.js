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
  let filter = "";
  if (req.query.filter && req.query.filter !== "null") {
    filter = decodeURIComponent(req.query.filter);
  }
 
  console.log("layer: ", layer);
  console.log("filter: ", filter);

  pool.query(filter !== "" && filter !== "null" ? `select ST_AsGeoJSON(geom) as geometry, * from ${layer} where ${filter}` : `select ST_AsGeoJSON(geom) as geometry, * from ${layer}`, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send(result.rows)
    }
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