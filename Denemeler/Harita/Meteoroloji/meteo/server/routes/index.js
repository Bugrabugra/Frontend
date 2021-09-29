const express = require("express");
const routerUsers = require("./users");
const routerRules = require("./rules");
const routerAuth = require("./auth");
const routerApi = express.Router();
const {verifyCookieToken} = require("../middleware/verifyToken");


routerApi.use("/users", verifyCookieToken, routerUsers);
routerApi.use("/rules", verifyCookieToken, routerRules);
routerApi.use("/auth", routerAuth);

module.exports = routerApi;