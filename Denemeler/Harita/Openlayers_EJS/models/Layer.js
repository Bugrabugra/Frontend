const mongoose = require("mongoose");

const layerSchema = new mongoose.Schema({
  lyrName: {
    type: String,
    required: [true, "Please enter a layer name"],
    unique: true
  },
  lyrGeoServerName: {
    type: String,
    required: [true, "Please enter a geoserver layer name"],
    unique: true
  },
  lyrStrokeColor: {
    type: String,
    required: [true, "Please enter a color code"],
  },
  lyrStrokeWidth: {
    type: Number,
    required: [true, "Please enter a stroke width"],
  },
  lyrFillColor: {
    type: String,
    required: [true, "Please enter a color code"],
  },
  lyrOpacity: {
    type: Number,
    required: [true, "Please enter an opacity value"],
  },
  lyrPointRadius: {
    type: Number,
  },
  lyrMinZoom: {
    type: Number,
    required: [true, "Please enter minimum zoom level"]
  },
  lyrMaxZoom: {
    type: Number,
    required: [true, "Please enter maximum zoom level"]
  },
  lyrFields: {
    type: Array
  },
  lyrLabelField: {
    type: String
  },
  lyrFontFamily: {
    type: String
  },
  lyrFontFillColor: {
    type: String
  },
  lyrFontStrokeColor: {
    type: String
  },
  lyrFontStrokeWidth: {
    type: Number
  },
  lyrFontBold: {
    type: String
  },
  lyrFontSize: {
    type: Number
  },
  lyrFontPlacement: {
    type: String
  },
  lyrFontOffsetY: {
    type: Number
  }
});

const Layer = mongoose.model("layer", layerSchema);

module.exports = Layer;