"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateUrl = void 0;
const AppError_1 = __importDefault(require("../utils/AppError"));
const validateCreateUrl = (req, res, next) => {
    const originalUrl = req.body?.originalUrl;
    if (typeof originalUrl !== "string") {
        return next(new AppError_1.default("originalUrl is required", 400));
    }
    const trimmedUrl = originalUrl.trim();
    if (!trimmedUrl) {
        return next(new AppError_1.default("originalUrl cannot be empty", 400));
    }
    try {
        const parsedUrl = new URL(trimmedUrl);
        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
            return next(new AppError_1.default("Invalid URL format", 400));
        }
    }
    catch {
        return next(new AppError_1.default("Invalid URL format", 400));
    }
    req.body.originalUrl = trimmedUrl;
    return next();
};
exports.validateCreateUrl = validateCreateUrl;
