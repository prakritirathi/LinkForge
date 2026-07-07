import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import healthRoutes from "./routes/health.routes";
import authRouter from "./routes/auth.routes";
import urlRouter from "./routes/url.routes";
import errorMiddleware from "./middleware/error.middleware";
import { redirectUrl } from "./controllers/url.controller";

const app = express();

const allowedOrigins = [
	"http://localhost:5173",
	process.env.FRONTEND_URL,
].filter((origin): origin is string => Boolean(origin));

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
	})
);

app.use(express.json());
app.use(cookieParser());

app.use("/health", healthRoutes);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/url", urlRouter);

app.get("/:shortCode", redirectUrl);

app.use(errorMiddleware);

export default app;