import commentRouter from "./routes/commentRoutes";
import corsMiddleware from "./middleware/cors";
import errorHandler from "./middleware/errorHandler";
import express, {} from "express";
import { Pool } from "pg";

const app = express();
const PORT = process.env.PORT ?? 5000;

const pool: Pool = new Pool({ connectionString: process.env.DATABASE_URL });
await pool.query(
  "CREATE TABLE IF NOT EXISTS comments (id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name TEXT NOT NULL, comment TEXT NOT NULL)",
);

app.use(corsMiddleware);

app.use(express.json());

app.use("/api/comments", commentRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});

export default pool;
