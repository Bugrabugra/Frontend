require("dotenv").config();
const connectDb = require("./server/config/db");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const methodOverride = require("method-override");

const express = require("express");

const app = express();
const expressLayout = require("express-ejs-layouts");
const PORT = process.env.PORT || 5000;

// connect to db
connectDb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  })
}))

app.use(express.static("public"));

// templating engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
