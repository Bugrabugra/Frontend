const express = require("express");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");


// Set up app
const app = express();

// Set up view engine
app.set("view engine", "ejs");

// Cookie session
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to mongoDb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("Connected to MongoDb");
});

// Set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);


// Create home route
app.get("/", (req, res) => {
  res.render("home", {user: req.user});
})

app.listen(3000, () => {
  console.log("App now listening for requests on port 3000");
})

