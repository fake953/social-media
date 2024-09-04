import express from "express";
const router = express.Router();
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getOtherUsersDetail,
  getOtherUsersFriends,
} from "../controllers/users.js";
import { verifiedToken } from "../middleware/auth.js";

router.get("/:id", verifiedToken, getUser);
router.get("/:id/friends", verifiedToken, getUserFriends);
router.get("/profiles/:id", getOtherUsersDetail);
router.get("/profiles/:id/friends", getOtherUsersFriends);

router.patch("/:id/:friendId", verifiedToken, addRemoveFriend);

export default router;
