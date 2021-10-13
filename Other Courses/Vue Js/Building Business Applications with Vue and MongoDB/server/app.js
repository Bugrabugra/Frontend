const express = require("express");
const mongoose = require("mongoose");

const app = express();
const api = require("./api");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

app.set("port", (process.env.PORT || 8082));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use("/api", api);
app.use(express.static("static"));
app.use(morgan("dev"));

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404
  res.json(err);
});

const dbURI = "mongodb+srv://user:password@cluster0.sehxn.mongodb.net/globomantics?authSource=admin&replicaSet=atlas-qqm3fb-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
mongoose.connect(dbURI, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"))
db.once("open", () => {
  console.log("Connected to MongoDB!");

  app.listen(app.get("port"), () => {
    console.log("Server listening on port " + app.get("port"));
  })
})



