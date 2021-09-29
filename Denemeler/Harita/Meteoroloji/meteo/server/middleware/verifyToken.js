const jwt = require("jsonwebtoken");

const verifyCookieToken = async (req, res, next) => {
  try {
    if (req.cookies.meteor) {
      const token = req.cookies.meteor;
      await jwt.verify(token, process.env.JWT_SECRET, null,
        (error, result) => {
          if (result) {
            // const {username, email, admin} = result;
            // req.user = {username, email, admin};
            // console.log(req.user);
            return next();
          }
          if (error) {
            // TODO handle errors on frontend
            console.log(error)
          }
        });
    } else {
      return res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
    res.clearCookie("meteor");
    return res.redirect("/login");
  }
};

module.exports = {verifyCookieToken};