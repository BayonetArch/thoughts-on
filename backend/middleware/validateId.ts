import type { NextFunction, Request, Response } from "express";
import logger from "../lib/logger";
import idSchema from "../schemas/idSchema";

export default function validateId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = idSchema.safeParse(req.params.id);

  if (!result.success) {
    logger.error("Could not validate the param id\n", result.error);

    return res.status(400).json({
      ok: false,
      error: "invalid id",
    });
  }

  req.params.id = result.data;
  next();
}
