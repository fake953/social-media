import express from "express";
const router = express.Router();

import {
  getAllPosts,
  createPost,
  deletePost,
  chosenPost,
} from "../controllers/post.js";

router.get("/", getAllPosts);
router.post("/", createPost);
// router.put('/:id',updatePost)
router.delete("/:id", deletePost);
router.get("/:id", chosenPost);
export default router;
