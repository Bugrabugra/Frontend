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
routerUsers.get("/getUsers", getUsers);

// get specific user
routerUsers.get("/getUser/:id", getUser);

// create user
routerUsers.post("/createUser", createUser);

// edit user
routerUsers.post("/editUser/:id", editUser)

// delete user
routerUsers.post("/deleteUser/:id", deleteUser);

module.exports = routerUsers;