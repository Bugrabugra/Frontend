require("dotenv").config();
require("colors");
const express = require("express");

// express app
const app = express();

// middleware
app.use((req, res, next) => {
  console.log(req.path.brightYellow, req.method.brightBlue);
  next();
})

// routes
app.get("/", (req, res) => {
  res.json({mssg: "Welcome to the app"})
});

// listen for requests
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});