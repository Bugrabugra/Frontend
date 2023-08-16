const express = require("express");
const {
  adminPageController, loginController, registerController, dashboardPageController
} = require("../controllers/admin.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("", adminPageController);
router.post("", loginController);
router.post("/register", registerController);

module.exports = router;
