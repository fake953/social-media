import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import multer from "multer";
import MulterGridfsStorage from "multer-gridfs-storage";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import "dotenv/config";

// CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// DATABASE CONFIGURATION
const Port = process.env.PORT || 3000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("connected");
    app.listen(Port, () => {
      console.log(`Running at port ${Port}`);
    });
  } catch (error) {
    console.log(`Error while connecting to mongodb: ${error}`);
  }
};
connectDB();
