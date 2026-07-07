import prisma from "../lib/prisma";
import { SignupDto } from "../types/auth.types";

export const createUser = async (userData: SignupDto) => {
    const user = await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: userData.password,
        },
    });

    return user;
};

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email,
        },
    });
};

export const findUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: {
            id,
        },
    });
};