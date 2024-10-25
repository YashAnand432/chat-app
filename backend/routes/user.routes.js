import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controller/user.controller.js";
import { sendFriendRequest } from "../controller/user.controller.js";
import { acceptFriendRequest } from "../controller/user.controller.js";
import { rejectFriendRequest } from "../controller/user.controller.js";
import { getFriendList } from "../controller/user.controller.js";
import { searchUsersForFriend } from "../controller/user.controller.js";
import { getFriendStatus } from "../controller/user.controller.js";
import {deleteFriend} from "../controller/user.controller.js";
import { getReceivedRequests } from "../controller/user.controller.js";
const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar)
router.post("/send-friend-request/:id", protectRoute, sendFriendRequest);
router.post("/accept-friend-request/:id", protectRoute, acceptFriendRequest);
router.post("/reject-friend-request/:id", protectRoute, rejectFriendRequest);
router.get("/get-friend-list", protectRoute, getFriendList);
router.get("/get-friend-status/:id", protectRoute, getFriendStatus);
router.get("/search-user-for-friend", protectRoute, searchUsersForFriend);
router.post("/delete/:id" , protectRoute, deleteFriend);
router.get("/get-received-requests", protectRoute, getReceivedRequests);
export default router; 