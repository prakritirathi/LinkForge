"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getCurrentUser = exports.login = exports.signup = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const auth_service_1 = require("../services/auth.service");
const user_repository_1 = require("../repositories/user.repository");
exports.signup = (0, asyncHandler_1.default)(async (req, res) => {
    const { name, email, password } = req.body;
    const result = await (0, auth_service_1.signup)({
        name,
        email,
        password,
    });
    if (!result.success) {
        return res.status(result.message === "Email already exists" ? 409 : 400).json(result);
    }
    return res.status(201).json(result);
});
exports.login = (0, asyncHandler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const result = await (0, auth_service_1.login)({
        email,
        password,
    });
    if (!result.success) {
        return res.status(401).json(result);
    }
    res.cookie("token", result.token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
        success: true,
        message: result.message,
        user: result.user,
    });
});
exports.getCurrentUser = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Authentication required",
        });
    }
    const user = await (0, user_repository_1.findUserById)(userId);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    const { password, ...safeUser } = user;
    return res.status(200).json({
        success: true,
        user: safeUser,
    });
});
exports.logout = (0, asyncHandler_1.default)(async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});
