const express = require("express");
const authController = require("./authController");

const router = express.Router();

router.get("/signup", authController.signup_get);
router.get("/login", authController.login_get);
router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);

module.exports = router;