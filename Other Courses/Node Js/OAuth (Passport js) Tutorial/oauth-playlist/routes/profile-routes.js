const router = require("express").Router();


const authCheck = (req, res, next) => {
  if (!req.user) {
    // If user is not logged in
    res.redirect("/auth/login");
  } else {
    // If logged in
    next();
  }
}

router.get("/", authCheck, (req, res) => {
  res.render("profile", {user: req.user});
})

module.exports = router;