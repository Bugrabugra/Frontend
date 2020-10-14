const User = require("../../models/User");
const Layer = require("../../models/Layer");
const AddressLayer = require("../../models/AddressLayer");
const Map = require("../../models/Map");
const jwt = require("jsonwebtoken");
const config = require("../../config/default");


module.exports.users_get = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.adminSecret, async (error, decodedToken) => {
      if (error) {
        console.log(error)
      } else {
        const user = await User.find({});
        res.status(200).json(user);
      }
    });
  }
};

module.exports.layers_get = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.adminSecret, async (error, decodedToken) => {
      if (error) {
        console.log(error)
      } else {
        const layers = await Layer.find({});
        res.status(200).json(layers);
      }
    })
  }
};

module.exports.layer_update = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.adminSecret, async (error, decodedToken) => {
      if (error) {
        console.log(error)
      } else {
        try {
          const id = req.params.id;
          const updates = req.body;
          const options = {new: true};

          const result = await Layer.findByIdAndUpdate(id, {$set: updates}, options);
          res.send(result);
        } catch (error) {
          console.log(error.message);
        }
      }
    })
  }
};

module.exports.layer_create = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.adminSecret, async (error, decodedToken) => {
      if (error) {
        console.log(error)
      } else {
        try {
          const newLayer = req.body;
          const result = await Layer.create(newLayer);
          res.send(result);
        } catch (error) {
          console.log(error.message);
        }
      }
    })
  }
};

module.exports.layer_delete = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.adminSecret, async (error, decodedToken) => {
      if (error) {
        console.log(error)
      } else {
        try {
          const id = req.params.id;
          const result = await Layer.deleteOne({_id: id});
          res.send(result);
        } catch (error) {
          console.log(error.message);
        }
      }
    })
  }
};

module.exports.user_update = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.adminSecret, async (error, decodedToken) => {
      if (error) {
        console.log(error)
      } else {
        try {
          const id = req.params.id;
          const updates = req.body;
          const options = {new: true};

          const result = await User.findByIdAndUpdate(id, {$set: updates}, options);
          res.send(result);
        } catch (error) {
          console.log(error.message);
        }
      }
    })
  }
};

module.exports.user_get = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.adminSecret, async (error, decodedToken) => {
      if (error) {
        console.log(error)
      } else {
        const id = req.params.id;
        const user = await User.findById(id);
        res.status(200).json(user);
      }
    })
  }
};

module.exports.addressLayer_update = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.adminSecret, async (error, decodedToken) => {
      if (error) {
        console.log(error)
      } else {
        try {
          const id = req.params.id;
          const updates = req.body;
          const options = {new: true};

          const result = await AddressLayer.findByIdAndUpdate(id, {$set: updates}, options);
          res.send(result);
        } catch (error) {
          console.log(error.message);
        }
      }
    })
  }
};

module.exports.map_update = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.adminSecret, async (error, decodedToken) => {
      if (error) {
        console.log(error)
      } else {
        try {
          const id = req.params.id;
          const updates = req.body;
          const options = {new: true};

          const result = await Map.findByIdAndUpdate(id, {$set: updates}, options);
          res.send(result);
        } catch (error) {
          console.log(error.message);
        }
      }
    })
  }
};