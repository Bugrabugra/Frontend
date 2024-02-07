import express from "express"
import dotenv from "dotenv";
import shopRouter from "./shop";

dotenv.config({ path: ".dev.env" });

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use(shopRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
