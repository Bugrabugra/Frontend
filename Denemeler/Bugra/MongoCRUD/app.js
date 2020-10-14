const express = require("express");
const cors = require("cors");
const monk = require("monk");
const authRoutes = require("./auth/authRoutes");
const cookieParser = require("cookie-parser");

require('dotenv').config();

// App
const app = express();

// View engine
app.set("view engine", "ejs");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));

const db = monk(process.env.MONGO_URI);
db.then(() => {
  console.log("Connected to MongoDB!");
  app.listen(3000);
  console.log("Listening: http://localhost:3000")
});

app.get("/", (req, res, next) => {
  try {
    res.render("home");
  } catch (error) {
    next(error);
  }
});

app.get("/smoothies", (req, res, next) => {
  try {
    res.render("smoothies");
  } catch (error) {
    next(error);
  }
});

app.use(authRoutes);