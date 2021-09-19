const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const queries = require("./queries");


const app = express();
const PORT = 3001;

// middleware
app.use(cors());

// queries
app.get("/layer", queries.getFeatures);
app.get("/fields", queries.getFields);
app.get("/unique", queries.getUniqueValues);

// listen server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});