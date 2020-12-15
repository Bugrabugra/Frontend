const express = require("express");
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const escape = require("pg-escape");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'upwork_google',
  password: 'buura66304736',
  port: 5433,
})

app.post('/territories/new', async(req, res) => {
  const territoryName = req.body.territoryName;
  const layerName = req.body.layerName;
  const geometry = req.body.geometry;

  const client = await pool.connect();
  const query = await client.query(`INSERT INTO public.territories (territory_name, layer_name, geometry) VALUES ('${territoryName}', '${layerName}', '${geometry}')` , (err, response) => {
    client.release();
    res.send(response);
  });
})

app.get('/territories', async(req, res) => {
  const client = await pool.connect();
  const query = await client.query(`SELECT * FROM public.territories` , (err, response) => {
    client.release();
    res.send(response.rows);
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
