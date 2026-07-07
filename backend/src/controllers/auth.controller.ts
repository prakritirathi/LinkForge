import { Request, Response } from "express";
import {
  login as loginService,
  signup as signupService,
} from "../services/auth.service";
import { findUserById } from "../repositories/user.repository";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const result = await signupService({
      name,
      email,
      password,
    });

    if (!result.success) {
      return res.status(result.message === "Email already exists" ? 409 : 400).json(result);
    }

    return res.status(201).json(result);
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginService({
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
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
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
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
});

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};