const express = require("express");
const colors = require("colors");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3001;
const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

connectDB();
const app = express();
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
