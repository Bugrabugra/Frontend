const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const entriesRoute = require("./routes/Entries");

const cors = require("cors");
const PORT = 3001;


// Create app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
mongoose.connect("mongodb://localhost:27017/phone-book", {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.log("Error: ", error)
  });

// Define routes
app.use("/entries", entriesRoute);

// Listen
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
})