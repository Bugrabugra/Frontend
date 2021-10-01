const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// login
const login = async (req, res) => {
  const {username, password} = req.body;
  await db.query(
    `select * from users where username = '${username}'`,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        // if username exists
        if (result.rows.length > 0) {
          const hashedPassword = result.rows[0]["password"];
          bcrypt.compare(password, hashedPassword, function(err, bcryptResult) {
            if (bcryptResult) {
              // if username exists and password is correct
              const {username, email, admin} = result.rows[0];
              jwt.sign(
                {username, email, admin},
                process.env.JWT_SECRET,
                {
                  expiresIn: "1d"
                },
                (error, token) => {
                  res.cookie("meteor", token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
                  res.json({username, email, admin});
                }
                )
            } else {
              // if username exists but password is incorrect
              res.send({errorPassword: "Şifre yanlıştır"})
            }
          });
        } else {
          // if username does not exists
          res.send({errorUsername: "Kullanıcı adı bulunamamıştır"})
        }
      }
    })
};

// logout
const logout = async (req, res) => {
  await res.clearCookie("meteor");
  res.status(200);
  res.send("Logged out");
};

module.exports = {login, logout};