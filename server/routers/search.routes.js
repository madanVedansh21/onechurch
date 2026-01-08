import { Router } from "express";
import { search } from "../controllers/search.controllers.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", verifyJwt, search);

export default router;
