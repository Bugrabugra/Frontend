const express = require("express");
const cors = require("cors");
const queries = require("./queries");

const app = express();
const PORT = 3001 || process.env.PORT;

// middleware
app.use(cors());

app.post("/layer", queries.getFeatures);
app.post("/fields", queries.getFields);
app.post("/unique", queries.getUniqueValues);

// listen server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})