const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const aqp = require("api-query-params");

const app = express();
const PORT = process.env.PORT || 3001;


// mongoose connection
mongoose.connect(
  "mongodb://localhost:27017/vue-tailwind-filter"
).then(() => {
  console.log("Connected to MongoDB");
}).catch(error => {
  console.log(error);
});

// middleware
app.use(cors());

// mongoose schema
const schemaAd = new mongoose.Schema({
  tags: {
    type: Array
  },
  countFloor: {
    type: Number
  },
  countRoom: {
    type: Number
  },
  address: {
    type: String
  },
  estateType: {
    type: String
  },
  dateBuilding: {
    type: Date
  },
  numberFloor: {
    type: Number
  },
});

const Ads = mongoose.model("ads", schemaAd, "ads");

// get all documents
app.get("/ads", async (req, res) => {
  const query = req.query;
  const {filter, skip, limit, sort, projection, population} = aqp(query);

  console.log(filter, skip, limit, sort, projection, population);

  // console.log(queryArray);
  const ads = await Ads
    .find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population)
    .exec((error, ads) => {
      if (error) {
        return next(error);
      }
      res.json(ads);
    });
});


// listen app
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});