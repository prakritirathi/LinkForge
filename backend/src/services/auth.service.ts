import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../repositories/user.repository";
import { LoginDto, SignupDto } from "../types/auth.types";
import { generateToken } from "../utils/jwt";
export const signup = async (userData: SignupDto) => {
    if (!userData.name?.trim() || !userData.email?.trim() || !userData.password?.trim()) {
        return {
            success: false,
            message: "Name, email, and password are required",
        };
    }

    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        return {
            success: false,
            message: "Email already exists",
        };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await createUser({
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

export const login = async (credentials: LoginDto) => {
    const user = await findUserByEmail(credentials.email);

    if (!user) {
        return {
            success: false,
            message: "Invalid credentials",
        };
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

    if (!isPasswordValid) {
        return {
            success: false,
            message: "Invalid credentials",
        };
    }

    
    const token = generateToken(user.id);

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