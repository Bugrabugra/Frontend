const express = require("express");
const cors = require("cors");
const router = require("./routes");


const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api", router);

// listen server
app.listen(PORT, () => {
  console.log(`Server started listening on port: ${PORT}`)
})