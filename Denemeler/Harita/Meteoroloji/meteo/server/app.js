const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");
const cookieParser = require("cookie-parser")


const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors({
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api", routerApi);

// listen server
app.listen(PORT, () => {
  console.log(`Server started listening on port: ${PORT}`)
})