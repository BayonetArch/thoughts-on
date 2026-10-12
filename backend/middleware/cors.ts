import { type Request, type Response, type NextFunction } from "express";

export default function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(req.method, req.url);

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
}
