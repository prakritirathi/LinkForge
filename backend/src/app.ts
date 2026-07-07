import express from "express";
import cookieParser from "cookie-parser";
import healthRoutes from "./routes/health.routes";
import authRouter from "./routes/auth.routes";
import urlRouter from "./routes/url.routes";
import errorMiddleware from "./middleware/error.middleware";
import { redirectUrl } from "./controllers/url.controller";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/health", healthRoutes);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/url", urlRouter);
app.get("/:shortCode", redirectUrl);

app.use(errorMiddleware);

export default app;