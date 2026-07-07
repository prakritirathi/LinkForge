import {
	findByShortCode,
	findUrlsByUserId,
	findUrlByOriginalUrlAndUserId,
	incrementClicks,
	insertUrl,
	updateShortCode,
} from "../repositories/url.repository";
import AppError from "../utils/AppError";
import { encodeBase62 } from "../utils/base62";
import redisClient from "../lib/redis";

export const createShortUrl = async (originalUrl: string, userId: string) => {
	const existingUrl = await findUrlByOriginalUrlAndUserId(originalUrl, userId);

	if (existingUrl && existingUrl.shortCode) {
		return {
			shortCode: existingUrl.shortCode,
			originalUrl: existingUrl.originalUrl,
		};
	}

	const url = await insertUrl(originalUrl, userId);
	const shortCode = encodeBase62(url.id);
	const updatedUrl = await updateShortCode(url.id, shortCode);

	return {
		shortCode: updatedUrl.shortCode,
		originalUrl: updatedUrl.originalUrl,
	};
};

export const getOriginalUrl = async (shortCode: string) => {
	const cacheKey = `url:${shortCode}`;

	const cachedUrl = await redisClient.get(cacheKey);

	if (cachedUrl) {
		try {
			const parsedUrl = JSON.parse(cachedUrl) as {
				id: number;
				originalUrl: string;
			};

			await incrementClicks(parsedUrl.id);

			console.log("Cache hit");

			return parsedUrl.originalUrl;
		} catch {
			await redisClient.del(cacheKey);
			console.log("Invalid cache deleted");
		}
	}

	const url = await findByShortCode(shortCode);

	if (!url) {
		throw new AppError("URL not found", 404);
	}

	await redisClient.set(
		cacheKey,
		JSON.stringify({
			id: url.id,
			originalUrl: url.originalUrl,
		}),
		{
			EX: 60 * 60,
		}
	);

	await incrementClicks(url.id);

	console.log("Cache miss");

	return url.originalUrl;
};

export const getUrlStats = async (shortCode: string) => {
	const url = await findByShortCode(shortCode);

	if (!url) {
		throw new AppError("URL not found", 404);
	}

	return {
		shortCode: url.shortCode,
		originalUrl: url.originalUrl,
		clicks: url.clicks,
		followed: url.clicks > 0,
		createdAt: url.createdAt,
		updatedAt: url.updatedAt,
	};
};

export const getUserUrlHistory = async (userId: string) => {
	return findUrlsByUserId(userId);
};