const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/default");


const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // Check json web token exists & is verified
  if (token) {
    jwt.verify(token, config.adminSecret, (error, decodedToken) => {
      if (error) {
        console.log(error.message);
        res.redirect("/notAuthorized");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// Check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.adminSecret, async (error, decodedToken) => {
      if (error) {
        jwt.verify(token, config.userSecret, async (error, decodedToken) => {
          if (error) {
            res.locals.user = null;
            next();
          } else {
            let user = await User.findById(decodedToken.id);
            res.locals.user = user;
            next();
          }
        });
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {requireAuth, checkUser};