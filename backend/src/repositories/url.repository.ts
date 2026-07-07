import prisma from "../lib/prisma";

export const insertUrl = async (originalUrl: string, userId: string) => {
	return prisma.shortUrl.create({
		data: {
			originalUrl,
			userId,
			shortCode: null,
		},
	});
};

export const updateShortCode = async (id: number, shortCode: string) => {
	return prisma.shortUrl.update({
		where: {
			id,
		},
		data: {
			shortCode,
		},
	});
};

export const findUrlByOriginalUrlAndUserId = async (
	originalUrl: string,
	userId: string
) => {
	return prisma.shortUrl.findFirst({
		where: {
			originalUrl,
			userId,
		},
	});
};

export const findByShortCode = async (shortCode: string) => {
	return prisma.shortUrl.findUnique({
		where: {
			shortCode,
		},
	});
};

export const findUrlsByUserId = async (userId: string) => {
	return prisma.shortUrl.findMany({
		where: {
			userId,
		},
		orderBy: {
			createdAt: "desc",
		},
		select: {
			originalUrl: true,
			shortCode: true,
			clicks: true,
			createdAt: true,
			updatedAt: true,
		},
	});
};

export const incrementClicks = async (id: number) => {
	return prisma.shortUrl.update({
		where: {
			id,
		},
		data: {
			clicks: {
				increment: 1,
			},
		},
	});
};