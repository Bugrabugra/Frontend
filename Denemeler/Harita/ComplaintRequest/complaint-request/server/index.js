const express = require("express");
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'complaint-request',
  password: 'buura66304736',
  port: 5433,
})

app.post('/citizen', async(req, res) => {
  const identityNumber = req.body.user;
  const nameSurname = req.body.pass;

  const client = await pool.connect();
  const query = await client.query(`SELECT * FROM public.muhatap where tc = '${identityNumber}' and adsoyad = '${nameSurname}'` , (err, response) => {
    client.release();
    res.send(response.rows[0]);
  });
})

app.post('/state', async(req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;

  const client = await pool.connect();
  const query = await client.query(`SELECT * FROM public.personel where eposta = '${user}' and sifre = '${pass}'` , (err, response) => {
    client.release();
    res.send(response.rows[0]);
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
