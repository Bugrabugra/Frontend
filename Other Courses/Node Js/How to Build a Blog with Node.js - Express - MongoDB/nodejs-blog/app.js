require("dotenv").config();

const express = require("express");

const app = express();
const expressLayout = require("express-ejs-layouts");
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));

// templating engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
