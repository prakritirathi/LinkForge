"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const errorMiddleware = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    if (error instanceof AppError_1.default) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }
    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};
exports.default = errorMiddleware;
