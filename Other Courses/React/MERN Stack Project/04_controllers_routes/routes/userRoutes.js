const express = require("express");
const usersController = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser)

module.exports = router;
