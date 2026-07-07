import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import {
  login as loginService,
  signup as signupService,
} from "../services/auth.service";
import { findUserById } from "../repositories/user.repository";

const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? ("none" as const) : ("lax" as const),
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required",
    });
  }

  const result = await signupService({
    name,
    email,
    password,
  });

  if (!result.success) {
    return res.status(result.message === "Email already exists" ? 409 : 400).json(result);
  }

  return res.status(201).json(result);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await loginService({
    email,
    password,
  });

  if (!result.success) {
    return res.status(401).json(result);
  }

  res.cookie("token", result.token, authCookieOptions);

  return res.status(200).json({
    success: true,
    message: result.message,
    user: result.user,
  });
});

export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const user = await findUserById(userId);

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

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token", authCookieOptions);

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});