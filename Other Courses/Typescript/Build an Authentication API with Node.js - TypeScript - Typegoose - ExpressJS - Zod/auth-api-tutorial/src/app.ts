require("dotenv").config();
import deserializeUser from "./middleware/deserializeUser";
import connectToDb from "./utils/connectToDb";
import express from "express";
import config from "config";
import log from "./utils/logger";
import router from "./routes";


const app = express();
const port = config.get("port");

app.use(express.json());
app.use(deserializeUser);
app.use(router);

app.listen(port, () => {
  log.info(`App started at http://localhost:${port}`)
  connectToDb();
});
