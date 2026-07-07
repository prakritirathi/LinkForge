"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementClicks = exports.findUrlsByUserId = exports.findByShortCode = exports.updateShortCode = exports.insertUrl = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const insertUrl = async (originalUrl, userId) => {
    return await prisma_1.default.shortUrl.create({
        data: {
            originalUrl,
            userId,
            shortCode: null,
        },
    });
};
exports.insertUrl = insertUrl;
const updateShortCode = async (id, shortCode) => {
    return await prisma_1.default.shortUrl.update({
        where: {
            id,
        },
        data: {
            shortCode,
        },
    });
};
exports.updateShortCode = updateShortCode;
const findByShortCode = async (shortCode) => {
    return await prisma_1.default.shortUrl.findUnique({
        where: {
            shortCode,
        },
    });
};
exports.findByShortCode = findByShortCode;
const findUrlsByUserId = async (userId) => {
    return await prisma_1.default.shortUrl.findMany({
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
exports.findUrlsByUserId = findUrlsByUserId;
const incrementClicks = async (id) => {
    return await prisma_1.default.shortUrl.update({
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
exports.incrementClicks = incrementClicks;
