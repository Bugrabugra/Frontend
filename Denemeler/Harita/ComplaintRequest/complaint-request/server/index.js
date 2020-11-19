const express = require("express");
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const jwt = require("jsonwebtoken");

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
  const district = req.body.district;
  const neighborhood = req.body.neighborhood;
  const street = req.body.street;
  const door = req.body.door;
  const topic = req.body.topic;
  const description = req.body.description;
  const type = req.body.type;
  const branch = req.body.branch;
  const date = req.body.date;
  const coordinates = req.body.coordinates;
  const id_user = req.body.id_user;

  const client = await pool.connect();
  const query = await client.query(`INSERT INTO public.istek_sikayetler (ilce, mahalle, sokak, kapi, konu, aciklama, turu, alani, tarih, id_muhatap, durumu, geometry) VALUES ('${district}', '${neighborhood}', '${street}', '${door}', '${topic}', '${description}', '${type}', '${branch}', '${date}', ${id_user}, 'Yeni', ST_SetSRID(
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
  });
})

app.post('/citizen', async(req, res) => {
  const identityNumber = req.body.user;
  const password = req.body.pass;

  const client = await pool.connect();
  const query = await client.query(`SELECT * FROM public.muhatap where tc = '${identityNumber}' and sifre = '${password}'` , (err, response) => {
    client.release();
    const token = jwt.sign(
      {id: response.rows[0].id},
      "citizen",
      {expiresIn: 60}
      );
    res.send({auth: true, token: token, user: response.rows[0]});
  });
})

app.post('/state', async(req, res) => {
  const email = req.body.user;
  const password = req.body.pass;

  const client = await pool.connect();
  const query = await client.query(`SELECT * FROM public.personel where eposta = '${email}' and sifre = '${password}'` , (err, response) => {
    client.release();
    const token = jwt.sign(
      {id: response.rows[0].id},
      response.rows[0].yonetici ? "admin" : "clerk",
      {expiresIn: 60}
    )
    res.send({auth: true, token: token, user: response.rows[0]});
  });
})

app.get('/items', async(req, res) => {
  const client = await pool.connect();
  const query = await client.query(`SELECT * FROM public.istek_sikayetler` , (err, response) => {
    client.release();
    res.send(response.rows);
  });
})

app.put('/items/:id', async(req, res) => {
  const itemID = req.params.id;
  const situation = req.body.situation;
  const client = await pool.connect();
  const query = await client.query(`UPDATE public.istek_sikayetler SET durumu = '${situation}' WHERE id = ${itemID}` , (err, response) => {
    client.release();
    console.log(response)
    res.send(response);
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
