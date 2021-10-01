const express = require("express");
const routerWarnings = express.Router();

const {
  getWarnings,
  getWarning,
  createWarning,
  editWarning,
  deleteWarning
} = require("../apis/warnings");

// get messages
routerWarnings.get("/getall", getWarnings);

// get specific message
routerWarnings.get("/getone/:id", getWarning);

// create message
routerWarnings.post("/create", createWarning);

// edit message
routerWarnings.post("/edit/:id", editWarning)

// delete message
routerWarnings.post("/delete/:id", deleteWarning);

module.exports = routerWarnings;