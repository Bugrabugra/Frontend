 const router = require("express").Router();

// Auth login
router.get("/login", (req, res) => {
  res.render("login", {user: req.user});
})

// Auth logout
router.get("/logout", (req, res) => {
  // Handle with passport
  res.send("logging out");
})

// Auth with Google
router.get("/google", (req, res) => {
  // Handle with passport
  res.send("logging in with Google");
})

module.exports = router;
