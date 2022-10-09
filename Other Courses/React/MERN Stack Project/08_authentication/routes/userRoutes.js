const express = require("express");
const usersController = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();
router.use(verifyJWT);

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser)

module.exports = router;
