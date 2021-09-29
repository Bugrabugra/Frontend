const express = require("express");
const routerAuth = express.Router();
const {login, logout} = require("../apis/auth");

// login
routerAuth.post("/login", login);
routerAuth.post("/logout", logout);

module.exports = routerAuth;