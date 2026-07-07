"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repository_1 = require("../repositories/user.repository");
const jwt_1 = require("../utils/jwt");
const signup = async (userData) => {
    const existingUser = await (0, user_repository_1.findUserByEmail)(userData.email);
    if (existingUser) {
        return {
            success: false,
            message: "Email already exists",
        };
    }
    const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
    const user = await (0, user_repository_1.createUser)({
        ...userData,
        password: hashedPassword,
    });
    const { password, ...safeUser } = user;
    return {
        success: true,
        message: "User created successfully",
        user: safeUser,
    };
};
exports.signup = signup;
const login = async (credentials) => {
    const user = await (0, user_repository_1.findUserByEmail)(credentials.email);
    if (!user) {
        return {
            success: false,
            message: "Invalid credentials",
        };
    }
    const isPasswordValid = await bcrypt_1.default.compare(credentials.password, user.password);
    if (!isPasswordValid) {
        return {
            success: false,
            message: "Invalid credentials",
        };
    }
    const token = (0, jwt_1.generateToken)(user.id);
    return {
        success: true,
        message: "Login successful",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    };
};
exports.login = login;
