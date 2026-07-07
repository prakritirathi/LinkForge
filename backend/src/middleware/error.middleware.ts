import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

const errorMiddleware = (
	error: unknown,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (res.headersSent) {
		return next(error);
	}

	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			success: false,
			message: error.message,
		});
	}

	
	const anyErr = error as any;
	if (anyErr && typeof anyErr.statusCode === "number") {
		console.error("Handled error:", anyErr);
		return res.status(anyErr.statusCode).json({
			success: false,
			message: anyErr.message || "Bad request",
		});
	}


	console.error(error);

	return res.status(500).json({
		success: false,
		message: "Internal server error",
	});
};

export default errorMiddleware;