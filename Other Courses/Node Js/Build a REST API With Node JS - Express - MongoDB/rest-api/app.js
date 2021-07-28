const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


// Create express app
const app = express();

// Database
mongoose.connect("mongodb://localhost:27017/motivation", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB database...")
})

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
})

const quotesRoute = require("./routes/Quotes");

app.use("/quotes", quotesRoute);

// Starting server
app.listen(3000, console.log("Listening on port 3000"));