const userSchema = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const monk = require("monk");
require('dotenv').config();

const db = monk(process.env.MONGO_URI);
const dbUser = db.get("user");

// Handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {email: "", password: ""};

  // Duplicate error code
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }
  
  // Validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    })
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign(
    {id},
    "net ninja secret",
    {expiresIn: maxAge}
    );
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  try {
    let {email, password} = req.body;
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    req.body.password = password;

    const value = await userSchema.validateAsync(req.body);
    const insertedUser = await dbUser.insert(value);

    const token = createToken(insertedUser._id);
    res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});
    res.status(201).json({user: insertedUser._id});
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
};

module.exports.login_post = async (req, res) => {
  const {email, password} = req.body;
  console.log(email, password);
  res.send("user login");
};