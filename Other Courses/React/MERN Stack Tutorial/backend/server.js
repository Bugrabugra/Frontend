require("dotenv").config();
require("colors");
const express = require("express");
const workoutRoutes = require("./routes/workout");
const mongoose = require("mongoose");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path.brightYellow, req.method.brightBlue);
  next();
})

// routes
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`connected to db & listening on port ${process.env.PORT}`.cyan.bold);
    });
  })
  .catch((error) => {
    console.log(error);
  })


