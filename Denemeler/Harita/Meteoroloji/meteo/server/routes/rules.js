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
routerRules.get("/getall", getRules);

// get specific user
routerRules.get("/getone/:id", getRule);

// create user
routerRules.post("/create", createRule);

// edit user
routerRules.post("/edit/:id", editRule)

// delete user
routerRules.post("/delete/:id", deleteRule);

module.exports = routerRules;