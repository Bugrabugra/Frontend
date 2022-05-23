const express = require("express");
const http = require("http");

const app = express();
const PORT = process.env.PORT || 3500;

app.get("/", (req, res) => {
  res.send("Hello world");
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
