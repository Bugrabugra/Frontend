const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  key: "userId",
  secret: "my-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 1000
  }
}))

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "12345",
  database: "loginsystem"
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("We need a token!");
  } else {
    jwt.verify(token, "jwt-secret", (err, decoded) => {
      if (err) {
        res.json({auth: false, message: "You failed to authenticate"});
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hash],
      (error, result) => {
        console.log(error);
      });
  })

});

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("You are authenticated");
})

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({loggedIn: true, user: req.session.user})
  } else {
    res.send({loggedIn: false})
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users where username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({err: err});
      }

      if (result.length) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;

            const id = result[0].id;
            const token = jwt.sign({id}, "jwt-secret", {
              expiresIn: 300,
            });

            res.json({auth: true, token, result});
          } else {
            res.json({auth: false, message: "Wrong username/password combination!"});
          }
        })
      } else {
        res.json({auth: false, message: "No user exists"});
      }
    });
});

app.listen(3001, () => {
  console.log("running server");
})
