const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");


// Define express
const app = express();

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/node-auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// MongoDB User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", UserSchema);

// Middleware
app.engine("hbs", hbs({extname: ".hbs"}));
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Setup user model
  User.findById(id, (error, user) => {
    done(error, user);
  });
});

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({username: username}, (error, user) => {
    if (error) {
      return done(error);
    }
    if (!user) {
      return done(null, false, {message: "Incorrect username."});
    }

    bcrypt.compare(password, user.password, (error, res) => {
      if (error) {
        return done(error);
      }
      if (res === false) {
        return done(null, false, {message: "Incorrect password."});
      }

      return done(null, user);
    });
  });
}));

// Controls
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

const isLoggedOut = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

// Routes
app.get("/", isLoggedIn, (req, res) => {
  res.render("index", {title: "Home"})
});

app.get("/about", isLoggedIn, (req, res) => {
  res.render("index", {title: "About"})
});

app.get("/login", isLoggedOut, (req, res) => {
  const response = {
    title: "Login",
    error: req.query.error
  }
  res.render("login", response);
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login?error=true"
}));

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Setup our admin user
app.get("/setup", async (req, res) => {
  const exists = await User.exists({username: "admin"});

  if (exists) {
    console.log("Exists");
    res.redirect("/login");
    return;
  }

  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error);
    }

    bcrypt.hash("pass", salt, (error, hash) => {
      if (error) {
        return next(error);
      }

      const newAdmin = new User({
        username: "admin",
        password: hash
      });

      newAdmin.save();
      res.redirect("/login");
    })
  })
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});