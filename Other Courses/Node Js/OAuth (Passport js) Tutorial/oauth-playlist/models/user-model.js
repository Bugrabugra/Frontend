const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username: String,
  googleId: String,
  thumbnail: String
})

const User = mongoose.model("user", UserSchema);

module.exports = User;