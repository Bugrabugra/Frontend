const express = require('express');
const bodyParser = require('body-parser');
const db = require("./db");
const cors = require("cors");
const path = require("path");
const mongoose = require('mongoose');
const authRoutes = require("../auth/authRoutes");
const cookieParser = require("cookie-parser");
const config = require("../config/default");
const {requireAuth, checkUser} = require("../auth/authMiddleware");

const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

// View engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static(path.join(__dirname, '../scripts')));
app.set('views', path.join(__dirname, '../views'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes main page
app.get("*", checkUser);
app.get('/', (req, res) => res.render('home'));
app.get("/admin", requireAuth, (req, res) => res.render("admin"));

// Routes map
app.get("/city", db.getCity);
app.get("/district/:cityCode", db.getDistrict);
app.get("/neighborhood/:districtCode", db.getNeighborhood);
app.get("/street/:neighborhoodCode", db.getStreet);
app.get("/door/:streetCode", db.getDoor);
app.get("/parcel/:neighborhoodCode/:block/:parcel", db.getParcel);

app.use(authRoutes);

// Database connection
const dbURI = `mongodb+srv://${config.mongoUser}:${config.mongoPassword}@cluster0.r1adi.mongodb.net/node-auth`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false })
  .then((result) => {
    app.listen(port);
    console.log("Connected to MongoDB!");
    console.log(`App running on http://localhost:${port}!`);
  })
  .catch((err) => console.log(err));



