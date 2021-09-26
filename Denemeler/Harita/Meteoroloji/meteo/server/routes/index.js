const express = require("express");
const routerUsers = require("./users");
const routerRules = require("./rules");
const routerApi = express.Router();


routerApi.use("/users", routerUsers);
routerApi.use("/rules", routerRules);

module.exports = routerApi;