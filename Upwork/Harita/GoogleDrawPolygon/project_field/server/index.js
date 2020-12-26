const express = require("express");
const bodyParser = require('body-parser');
const sql = require("mssql");


const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const config = {
  user: 'buura',
  password: 'asdfghjkl',
  server: 'BUGRA-PC\\SQLEXPRESS',
  database: 'upwork_google'
};

// Territories
app.get('/territories', async function (req, res) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .query('select * from upwork_google.dbo.territories');

    console.dir(result);
    res.send(result.recordset);
  } catch (err) {
    console.log(err)
  }
});

app.post('/territories/new', async function (req, res) {
  try {
    const territoryName = req.body.territoryName;
    const layerName = req.body.layerName;
    const geometry = req.body.geometry;

    let pool = await sql.connect(config);
    let result = await pool.request()
      .query(`INSERT INTO upwork_google.dbo.territories (territory_name, layer_name, geometry) VALUES ('${territoryName}', '${layerName}', '${geometry}')`);

    console.dir(result);
    res.send(result);
  } catch (err) {
    console.log(err)
  }
});

app.get('/territories/:layer', async function (req, res) {
  try {
    const layer = req.params.layer;

    let pool = await sql.connect(config);
    let result = await pool.request()
      .query(`select * from upwork_google.dbo.territories where layer_name = '${layer}'`);

    console.dir(result);
    res.send(result.recordset);
  } catch (err) {
    console.log(err)
  }
});

// Fields
app.get('/fields', async function (req, res) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .query('select * from upwork_google.dbo.fields');

    console.dir(result);
    res.send(result.recordset);
  } catch (err) {
    console.log(err)
  }
});

app.post('/fields/new', async function (req, res) {
  try {
    const fieldName = req.body.fieldName;
    const seedType = req.body.seedType;
    const geometry = req.body.geometry;

    let pool = await sql.connect(config);
    let result = await pool.request()
      .query(`INSERT INTO upwork_google.dbo.fields (field_name, seed_type, geometry) VALUES ('${fieldName}', '${seedType}', '${geometry}')`);

    console.dir(result);
    res.send(result);
  } catch (err) {
    console.log(err)
  }
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
