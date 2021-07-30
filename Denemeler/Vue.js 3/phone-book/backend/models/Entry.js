const mongoose = require("mongoose");


const EntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model("Entry", EntrySchema);