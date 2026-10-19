import { type Request, type Response, type NextFunction } from "express";
import { getUserBySessionToken } from "../services/sessions";

export default async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.session;
  if (!token) {
    return res.status(401).json({ ok: false, error: "not logged in" });
  }
  const user = await getUserBySessionToken(token);
  if (!user) {
    return res.status(401).json({ ok: false, error: "session expired" });
  }

  res.locals.user = user;
  next();
}
