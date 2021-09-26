const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  editUser
} = require("../api");

// get users
router.get("/getUsers", getUsers);

// get specific user
router.get("/getUser/:id", getUser);

// create user
router.post("/createUser", createUser);

// edit user
router.post("/editUser/:id", editUser)

// delete user
router.post("/deleteUser/:id", deleteUser);

module.exports = router;