const express = require("express");
const routerAlarm = express.Router();
const {checkPOIsForWarnings} = require("../apis/alarm");

// check pois
routerAlarm.post("/check", checkPOIsForWarnings);

module.exports = routerAlarm;