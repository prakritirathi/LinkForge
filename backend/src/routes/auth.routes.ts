import { Router } from "express";
import { getCurrentUser, login, logout, signup } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticate, getCurrentUser);
router.post("/logout", logout);

export default router;