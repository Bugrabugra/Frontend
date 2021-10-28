const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3001;

const app = express();

// connect to database
mongoose.connect("mongodb://localhost:27017/image-manager", {
  useNewUrlParser: true
}, (error) => {
  if (error) {
    console.error("Error: ", error);
  } else {
    console.log("Connected to MongoDB");
  }
})

// setup middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

// controllers
const ImageController = require("./controllers/ImageController");

// api routes
app.post("/upload", ImageController.uploadImage);
app.get("/retrieve", ImageController.retrieveImages);
app.post("/remove", ImageController.removeImage);

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
})
