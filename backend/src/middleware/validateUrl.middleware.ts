import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

export const validateCreateUrl = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const originalUrl = req.body?.originalUrl;

	if (typeof originalUrl !== "string") {
		return next(new AppError("originalUrl is required", 400));
	}

	const trimmedUrl = originalUrl.trim();

	if (!trimmedUrl) {
		return next(new AppError("originalUrl cannot be empty", 400));
	}

	try {
		const parsedUrl = new URL(trimmedUrl);
		if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
			return next(new AppError("Invalid URL format", 400));
		}
	} catch {
		return next(new AppError("Invalid URL format", 400));
	}

	req.body.originalUrl = trimmedUrl;
	return next();
};