const express = require("express");
const routerMap = express.Router();
const {getPOIs} = require("../apis/map");

// login
routerMap.get("/getpois", getPOIs);


module.exports = routerMap;