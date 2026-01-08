import { Router } from "express";
import {
  registerChurch,
  loginChurch,
  logoutChurch,
  changeChurchPassword,
  changeChurchAvatar,
  getChurchProfile,
  getChurchPostsMetaData,
  getChurchPosts,
  deleteChurchPost,
} from "../controllers/church.controllers.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerChurch);
router.post("/login", loginChurch);
router.post("/logout", verifyJwt, logoutChurch);

// Protected Routes
router.post("/change-password", verifyJwt, changeChurchPassword);
router.post("/change-avatar", verifyJwt, changeChurchAvatar);
router.get("/profile", verifyJwt, getChurchProfile);
router.get("/posts/meta", verifyJwt, getChurchPostsMetaData);
router.get("/posts/:postId", verifyJwt, getChurchPosts);
router.delete("/posts/:postId", verifyJwt, deleteChurchPost);

export default router;
