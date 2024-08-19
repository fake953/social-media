import express from "express";
const router = express.Router();

import {
  chosenPost,
  likePost,
  getUserPosts,
  getAllPosts,
} from "../controllers/post.js";
import { verifiedToken } from "../middleware/auth.js";
router.get("/", getAllPosts);
router.get("/:id", chosenPost);
router.get("/:userId/posts", getUserPosts);
router.patch("/:id/like", verifiedToken, likePost);
export default router;
