import express from "express";
const router = express.Router();

import {
  createPost,
  chosenPost,
  likePost,
  getUserPosts,
} from "../controllers/post.js";
import { verifiedToken } from "../middleware/auth.js";

router.post("/", verifiedToken, createPost);
router.get("/:id", chosenPost);
router.get("/:userId/posts", getUserPosts);
router.patch("/:id/like", verifiedToken, likePost);
export default router;
