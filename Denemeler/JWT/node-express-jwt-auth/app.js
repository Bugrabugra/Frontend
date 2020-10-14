const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const config = require("./config/default");

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// View engine
app.set('view engine', 'ejs');

// Database connection
const dbURI = `mongodb+srv://${config.dbUsername}:${config.dbPassword}@cluster0.r1adi.mongodb.net/node-auth`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    app.listen(3000);
    console.log("Server started at port: 3000");
  })
  .catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);