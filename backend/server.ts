import commentRouter from "./routes/commentRoutes";
import corsMiddleware from "./middleware/cors";
import errorHandler from "./middleware/errorHandler";
import express, {} from "express";

const app = express();
const PORT = process.env.PORT ?? 5000;

console.log(process.env.DATABASE_URL);

app.use(corsMiddleware);

app.use(express.json());

app.use("/api/comments", commentRouter);

app.use(errorHandler);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log("Server running on http://localhost:" + PORT),
  );
}

export default app;
