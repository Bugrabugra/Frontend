const express = require("express");
const app = express();
const port = 3000;
const qs = require("qs");
const axios = require("axios");
require("dotenv").config();


const apiURL = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = process.env.API_KEY;

app.get("/", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  let query = request.query;
  query.appId = apiKey;
  let queryString = qs.stringify(query);

  axios(`${apiURL}?${queryString}`)
    .then(res => {
      response.send(res.data);
    })
})


app.listen(port, () => {
  console.log("App is running at http://localhost:" + port);
})