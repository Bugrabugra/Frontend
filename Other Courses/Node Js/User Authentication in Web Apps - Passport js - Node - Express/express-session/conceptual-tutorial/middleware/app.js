const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// Create the Express application
const app = express();
// <user>:<password>@
const dbString = "mongodb://localhost:27017/tutorial_db";
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const connection = mongoose.createConnection(dbString, dbOptions);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
});

app.use(session({
  secret: "some secret",
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

app.get("/", (req, res, next) => {
  console.log(req.session);
  res.send("<h1>Hello World</h1>");
});

app.listen(3000);