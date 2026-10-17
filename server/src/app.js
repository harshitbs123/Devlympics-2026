import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ExpressError from "./utils/ExpressError.js";
import config from "./config/config.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: config.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(config.COOKIE_SECRET));

// Base health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running smoothly" });
});

// Routes
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res, next) => {
  throw new ExpressError(404, "Route Not Found");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong, please try again.";
  res.status(status).json({
    success: false,
    message,
  });
});

export default app;
