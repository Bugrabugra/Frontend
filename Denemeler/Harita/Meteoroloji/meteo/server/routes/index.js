const express = require("express");
const routerUsers = require("./users");
const routerRules = require("./rules");
const routerAuth = require("./auth");
const routerMap = require("./map");
const routerApi = express.Router();
const {verifyCookieToken} = require("../middleware/verifyToken");


routerApi.use("/users", verifyCookieToken, routerUsers);
routerApi.use("/rules", verifyCookieToken, routerRules);
routerApi.use("/map", verifyCookieToken, routerMap);
routerApi.use("/auth", routerAuth);

module.exports = routerApi;