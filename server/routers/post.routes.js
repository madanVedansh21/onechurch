import { Router } from "express";
import {
  createPost,
  getAllPosts,
  toggleLikePost,
} from "../controllers/post.controllers.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

// Public feed? Or protected? User said "unless a user is logged in he cant go to /".
// So protected.
router.use(verifyJwt);

router.post("/", createPost);
router.get("/", getAllPosts);
router.post("/:postId/like", toggleLikePost);

export default router;
