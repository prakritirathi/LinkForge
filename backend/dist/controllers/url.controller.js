"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlHistory = exports.getUrlAnalytics = exports.redirectUrl = exports.createUrl = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const url_service_1 = require("../services/url.service");
exports.createUrl = (0, asyncHandler_1.default)(async (req, res) => {
    const { originalUrl } = req.body;
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Authentication required",
        });
    }
    const result = await (0, url_service_1.createShortUrl)(originalUrl, userId);
    return res.status(201).json({
        success: true,
        shortUrl: result.shortCode,
    });
});
exports.redirectUrl = (0, asyncHandler_1.default)(async (req, res) => {
    const { shortCode } = req.params;
    if (Array.isArray(shortCode)) {
        return res.status(400).json({
            success: false,
            message: "Invalid short code",
        });
    }
    const originalUrl = await (0, url_service_1.getOriginalUrl)(shortCode);
    return res.redirect(originalUrl);
});
exports.getUrlAnalytics = (0, asyncHandler_1.default)(async (req, res) => {
    const { shortCode } = req.params;
    if (Array.isArray(shortCode)) {
        return res.status(400).json({
            success: false,
            message: "Invalid short code",
        });
    }
    const stats = await (0, url_service_1.getUrlStats)(shortCode);
    return res.status(200).json({
        success: true,
        stats,
    });
});
exports.getUrlHistory = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Authentication required",
        });
    }
    const history = await (0, url_service_1.getUserUrlHistory)(userId);
    return res.json(history);
});
