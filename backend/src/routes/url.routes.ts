import { Router } from "express";
import {
	createUrl,
	getUrlAnalytics,
	getUrlHistory,
} from "../controllers/url.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateCreateUrl } from "../middleware/validateUrl.middleware";

const router = Router();

router.post("/", authenticate, validateCreateUrl, createUrl);
router.get("/history", authenticate, getUrlHistory);
router.get("/:shortCode/stats", getUrlAnalytics);

export default router;