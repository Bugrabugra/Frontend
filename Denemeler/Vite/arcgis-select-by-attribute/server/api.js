const express = require("express");
const cors = require("cors");
const queries = require("./queries");

const app = express();
const PORT = 3001 || process.env.PORT;

// middleware
app.use(cors());

app.get("/layer", queries.getFeatures);
app.get("/fields", queries.getFields);
app.get("/unique", queries.getUniqueValues);

// listen server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})