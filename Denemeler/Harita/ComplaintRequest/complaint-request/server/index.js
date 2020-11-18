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

app.post('/citizen/new', async(req, res) => {
  const topic = req.body.topic;
  const description = req.body.description;
  const type = req.body.type;
  const date = req.body.date;
  const coordinates = req.body.coordinates;
  const id_user = req.body.id_user;

  const client = await pool.connect();
  const query = await client.query(`INSERT INTO public.istek_sikayetler (konu, aciklama, turu, tarih, id_muhatap, durumu, geometry) VALUES ('${topic}', '${description}', '${type}', '${date}', ${id_user}, 'Yeni', ST_SetSRID(
        ST_MakePoint(${coordinates[1]}::double precision, ${coordinates[0]}::double precision), 4326))` , (err, response) => {
    client.release();
    res.send(response);
  });
})

app.get('/citizen/:id', async(req, res) => {
  const userID = req.params.id;
  const client = await pool.connect();
  const query = await client.query(`SELECT * FROM public.istek_sikayetler where id_muhatap = ${userID}` , (err, response) => {
    client.release();
    res.send(response);
    console.log(response)
  });
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
