import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import helmet from "helmet";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

import postsRouter from "./routes/post.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import { registerUser } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import { verifiedToken } from "./middleware/auth.js";

//PROJECT CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.query());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));
// STORAGE CONFIGURATION
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//ROUES BY FILES
app.use("/auth/register", upload.single("picture"), registerUser);
app.use("/posts", verifiedToken, upload.single("picture"), createPost);
//ROUTES
app.use("/posts", postsRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_ENV)
  .then(() => {
    console.log("connected to the data base");
    app.listen(port, () => console.log(`listening on port :${port}`));
  })
  .catch((err) => console.log(`cannot connect to the mongodb : ${err}`));
