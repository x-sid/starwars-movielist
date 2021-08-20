import routes from "./src/routes/index.mjs";
import cors from "cors";
import {
  NotFoundError,
  ApiError,
  InternalError,
} from "./src/core/api-error.mjs";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const baseUrl = "/api/v1";

//parses the request coming into json object
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(`${baseUrl}`, routes);
app.use("/", (req, res) => {
  res.send("Welcome to starwars movie api");
});

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return ApiError.handle(err, res);
  }

  if (process.env.NODE_ENV === "development") {
    return res.status(500).send(err.message);
  }

  ApiError.handle(new InternalError(), res);
});

export default app;
