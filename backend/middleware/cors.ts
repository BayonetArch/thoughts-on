import { type Request, type Response, type NextFunction } from "express";
import logger from "../lib/logger";

export default function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.info(req.method, req.url);

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
}
