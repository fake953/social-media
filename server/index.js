import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import helmet from "helmet";

import postsRouter from "./routes/post.js";
import morgan from "morgan";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use()
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/posts", postsRouter);
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_ENV)
  .then(() => {
    console.log("connected to the data base");
    app.listen(port, () => console.log(`listening on port :${port}`));
  })
  .catch((err) => console.log(`cannot connect to the mongodb : ${err}`));
