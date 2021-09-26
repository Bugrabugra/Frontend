const express = require("express");
const routerRules = express.Router();
const {
  getRules,
  getRule,
  createRule,
  editRule,
  deleteRule
} = require("../apis/rules");

// get users
routerRules.get("/getRules", getRules);

// get specific user
routerRules.get("/getRule/:id", getRule);

// create user
routerRules.post("/createRule", createRule);

// edit user
routerRules.post("/editRule/:id", editRule)

// delete user
routerRules.post("/deleteRule/:id", deleteRule);

module.exports = routerRules;