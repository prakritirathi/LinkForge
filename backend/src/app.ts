import express from "express";
import cookieParser from "cookie-parser";
import healthRoutes from "./routes/health.routes";
import authRouter from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/health", healthRoutes);
app.use("/api/v1/auth", authRouter);

export default app;