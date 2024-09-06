import express from "express";
const router = express.Router();

import { loginUser } from "../controllers/auth.js";

router.post("/login", loginUser);

export default router;
