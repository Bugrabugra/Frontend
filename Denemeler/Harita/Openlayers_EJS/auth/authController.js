const User = require("../models/User");
const Layer = require("../models/Layer");
const AddressLayer = require("../models/AddressLayer");
const Map = require("../models/Map");

const jwt = require("jsonwebtoken");
const config = require("../config/default");

const maxAge = 3 * 24 * 60 * 60;

// Handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {email: "", password: ""};

  // Incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // Incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

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

const createToken = (id, admin) => {
  if (admin) {
    return jwt.sign(
      {id},
      config.adminSecret,
      {expiresIn: maxAge}
    );
  } else {
    return jwt.sign(
      {id},
      config.userSecret,
      {expiresIn: maxAge}
    );
  }

};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.notAuthorized = (req, res) => {
  res.render("notAuthorized");
};

module.exports.signup_post = async (req, res) => {
  const {email, password, permission, admin} = req.body;
  try {
    const user = await User.create({email, password, permission, admin});
    const token = createToken(user._id, false);
    res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});
    res.status(201).json({user: user._id});
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
};

module.exports.login_post = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.login(email, password);
    console.log(user.admin);
    let token;
    if (user.admin) {
      token = createToken(user._id, true);
    } else {
      token = createToken(user._id, false);
    }
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports.otherLayers_get = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.adminSecret, async (error, decodedToken) => {
      if (error) {
        jwt.verify(token, config.userSecret, async (error, decodedToken) => {
          if (error) {
            console.log(error)
          } else {
            const layers = await Layer.find({});
            const user = await User.findById(decodedToken.id);
            res.status(200).json(layers.filter((layer) => {
              return user.permission.includes(layer._id);
            }));
          }
        });
      } else {
        const layers = await Layer.find({});
        const user = await User.findById(decodedToken.id);
        res.status(200).json(layers.filter((layer) => {
          return user.permission.includes(layer._id);
        }));
      }
    });
  }
};

module.exports.addressLayers_get = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.adminSecret, async (error, decodedToken) => {
      if (error) {
        jwt.verify(token, config.userSecret, async (error, decodedToken) => {
          if (error) {
            console.log(error)
          } else {
            const addressLayers = await AddressLayer.find({});
            res.status(200).json(addressLayers);
          }
        });
      } else {
        const addressLayers = await AddressLayer.find({});
        res.status(200).json(addressLayers);
      }
    });
  }
};

module.exports.maps_get = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.adminSecret, async (error, decodedToken) => {
      if (error) {
        jwt.verify(token, config.userSecret, async (error, decodedToken) => {
          if (error) {
            console.log(error)
          } else {
            const maps = await Map.find({});
            res.status(200).json(maps);
          }
        });
      } else {
        const maps = await Map.find({});
        res.status(200).json(maps);
      }
    });
  }
};
