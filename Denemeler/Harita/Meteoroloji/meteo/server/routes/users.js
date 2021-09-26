const express = require("express");
const routerUsers = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  editUser
} = require("../apis/users");

// get users
routerUsers.get("/getall", getUsers);

// get specific user
routerUsers.get("/getone/:id", getUser);

// create user
routerUsers.post("/create", createUser);

// edit user
routerUsers.post("/edit/:id", editUser)

// delete user
routerUsers.post("/delete/:id", deleteUser);

module.exports = routerUsers;