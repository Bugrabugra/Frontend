const express = require("express");
const routerUsers = require("./users");
const routerRules = require("./rules");
const routerWarnings = require("./warnings");
const routerAuth = require("./auth");
const routerMap = require("./map");
const routerApi = express.Router();
const {verifyCookieToken} = require("../middleware/verifyToken");


routerApi.use("/map", routerMap);
routerApi.use("/users", routerUsers);
routerApi.use("/rules", routerRules);
routerApi.use("/warnings", routerWarnings);

routerApi.use("/auth", routerAuth);

module.exports = routerApi;