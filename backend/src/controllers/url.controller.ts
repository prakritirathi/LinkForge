import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import {
	createShortUrl,
	getOriginalUrl,
	getUrlStats,
	getUserUrlHistory,
} from "../services/url.service";


export const createUrl = asyncHandler(async (req: Request, res: Response) => {
	const { originalUrl } = req.body as { originalUrl: string };
	const userId = req.user?.userId;

	if (!userId) {
		return res.status(401).json({
			success: false,
			message: "Authentication required",
		});
	}

	const result = await createShortUrl(originalUrl, userId);

	return res.status(201).json({
		success: true,
		shortUrl: result.shortCode,
	});
});

export const redirectUrl = asyncHandler(async (req: Request, res: Response) => {
	const { shortCode } = req.params;

	if (Array.isArray(shortCode)) {
		return res.status(400).json({
			success: false,
			message: "Invalid short code",
		});
	}

	const originalUrl = await getOriginalUrl(shortCode);
	return res.redirect(originalUrl);
});

export const getUrlAnalytics = asyncHandler(async (req: Request, res: Response) => {
	const { shortCode } = req.params;

	if (Array.isArray(shortCode)) {
		return res.status(400).json({
			success: false,
			message: "Invalid short code",
		});
	}

	const stats = await getUrlStats(shortCode);

	return res.status(200).json({
		success: true,
		stats,
	});
});

export const getUrlHistory = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.userId;

	if (!userId) {
		return res.status(401).json({
			success: false,
			message: "Authentication required",
		});
	}

	const history = await getUserUrlHistory(userId);

	return res.json(history);
});