"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserUrlHistory = exports.getUrlStats = exports.getOriginalUrl = exports.createShortUrl = void 0;
const url_repository_1 = require("../repositories/url.repository");
const AppError_1 = __importDefault(require("../utils/AppError"));
const base62_1 = require("../utils/base62");
const createShortUrl = async (originalUrl, userId) => {
    const url = await (0, url_repository_1.insertUrl)(originalUrl, userId);
    const shortCode = (0, base62_1.encodeBase62)(url.id);
    const updatedUrl = await (0, url_repository_1.updateShortCode)(url.id, shortCode);
    return {
        shortCode: updatedUrl.shortCode,
        originalUrl: updatedUrl.originalUrl,
    };
};
exports.createShortUrl = createShortUrl;
const getOriginalUrl = async (shortCode) => {
    const url = await (0, url_repository_1.findByShortCode)(shortCode);
    if (!url) {
        throw new AppError_1.default("URL not found", 404);
    }
    await (0, url_repository_1.incrementClicks)(url.id);
    return url.originalUrl;
};
exports.getOriginalUrl = getOriginalUrl;
const getUrlStats = async (shortCode) => {
    const url = await (0, url_repository_1.findByShortCode)(shortCode);
    if (!url) {
        throw new AppError_1.default("URL not found", 404);
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
exports.getUrlStats = getUrlStats;
const getUserUrlHistory = async (userId) => {
    return await (0, url_repository_1.findUrlsByUserId)(userId);
};
exports.getUserUrlHistory = getUserUrlHistory;
