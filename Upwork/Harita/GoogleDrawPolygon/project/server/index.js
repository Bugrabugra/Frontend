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

// app.post("/territories/new", (req, res) => {
//   const territoryName = req.body.territoryName;
//   const layerName = req.body.layerName;
//   const geometry = req.body.geometry;
//
//   sql.connect(config, function (err) {
//     if (err) console.log(err);
//     // create Request object
//     const request = new sql.Request();
//
//     // query to the database and get the records
//     request.query(
//       'select * from territories',
//       function (err, recordset) {
//         if (err) console.log(err)
//         // send records as a response
//         console.log(recordset);
//         res.send(recordset);
//     });
//   });
// })


// app.post('/territories/new', async(req, res) => {
//   const territoryName = req.body.territoryName;
//   const layerName = req.body.layerName;
//   const geometry = req.body.geometry;
//
//   const client = await pool.connect();
//   const query = await client.query(`INSERT INTO public.territories (territory_name, layer_name, geometry) VALUES ('${territoryName}', '${layerName}', '${geometry}')` , (err, response) => {
//     client.release();
//     res.send(response);
//   });
// })

// app.get('/territories', async(req, res) => {
//   const client = await pool.connect();
//   const query = await client.query(`SELECT * FROM public.territories` , (err, response) => {
//     client.release();
//     res.send(response.rows);
//   });
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
