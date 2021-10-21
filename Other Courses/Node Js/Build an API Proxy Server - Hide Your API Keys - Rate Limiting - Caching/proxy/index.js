const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

// rate limiting - limits how many requests you can make
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20
});

app.use(limiter);
app.set("trust proxy", 1);

// set static folder
app.use(express.static("./client"))

// routes
app.use("/api", require("./routes"));


// enable cors
app.use(cors());

// listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})