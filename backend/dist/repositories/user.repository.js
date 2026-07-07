"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.createUser = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createUser = async (userData) => {
    const user = await prisma_1.default.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: userData.password,
        },
    });
    return user;
};
exports.createUser = createUser;
const findUserByEmail = async (email) => {
    return await prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
};
exports.findUserByEmail = findUserByEmail;
