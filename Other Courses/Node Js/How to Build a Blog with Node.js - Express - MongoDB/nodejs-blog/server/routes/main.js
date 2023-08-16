const express = require("express");
const router = express.Router();
const postsRoute = require("./post.route");
const adminRoute = require("./admin.route");
const { logoutController } = require("../controllers/admin.controller");

// routes
// home
router.use("", postsRoute);

// admin
router.use("/admin", adminRoute);
router.get("/logout", logoutController);

// about
router.get("/about", (req, res) => {
  res.render("about");
});


module.exports = router;
