const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");


const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api", routerApi);

// listen server
app.listen(PORT, () => {
  console.log(`Server started listening on port: ${PORT}`)
})