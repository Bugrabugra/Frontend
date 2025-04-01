import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import posts from "./routes/posts.js";
import { logger } from "./middlewares/logger.js";
import errorHandler from "./middlewares/error.js";
import { notFound } from "./middlewares/notFound.js";

const port = process.env.PORT || 8000;

// get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup static folder
app.use(express.static(path.join(__dirname, "public")));

// middlewares
app.use(logger);

// routes
app.use("/api/posts", posts);

// error handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
