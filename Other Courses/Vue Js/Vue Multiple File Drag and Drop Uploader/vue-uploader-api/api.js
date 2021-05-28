const express = require("express");
const app = express();
const cors = require("cors");

const port = 8000;

app.use(cors());

app.post("/api/uploads/video", (req, res) => {
  res.status(200)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})