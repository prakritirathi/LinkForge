import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
}

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication required",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = {
            userId: decoded.userId,
        };
        next();
    } catch {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};