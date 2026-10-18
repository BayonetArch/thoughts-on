import authRouter from "./routes/authRoutes";
import thoughtRouter from "./routes/thoughtRoutes";
import corsMiddleware from "./middleware/cors";
import errorHandler from "./middleware/errorHandler";
import express, {} from "express";
import logger from "./lib/logger";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cookieParser());

app.use(corsMiddleware);

app.use(express.json());

app.use("/api/thoughts", thoughtRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    logger.info("Server running on http://localhost:" + PORT),
  );
}

export default app;
