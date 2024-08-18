import express from "express";
const router = express.Router();
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifiedToken } from "../middleware/auth.js";

router.get("/:id", verifiedToken, getUser);
router.get("/:id/friends", getUserFriends);
router.patch("/:id/:friendId", addRemoveFriend);

export default router;
