const mongoose = require("mongoose");

const mapSchema = new mongoose.Schema({
  highlight: {
    strokeColor: {
      type: String
    },
    strokeWidth: {
      type: Number
    },
    fillColor: {
      type: String
    },
    strokeOpacity: {
      type: Number
    },
    fillOpacity: {
      type: Number
    },
    radius: {
      type: Number
    }
  },
  geoserver: {
    geoserverAddress: {
      type: String
    },
    geoserverUser: {
      type: String
    },
    geoserverPassword: {
      type: String
    },
    geoserverWorkspace: {
      type: String
    },
    geoserverDatastore: {
      type: String
    }
  }
});

const Map = mongoose.model("map", mapSchema);

module.exports = Map;