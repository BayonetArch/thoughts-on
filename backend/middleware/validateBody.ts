import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import logger from "../lib/logger";

export default function validateBody(schema: z.ZodType, errorMessage: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        error: errorMessage,
        issues: result.error.issues.map((i) => ({
          field: i.path.join(""),
          message: i.message,
        })),
      });
      logger.info(result, req.body);
      logger.error("Could not validate the request Body\n", result.error);
      return;
    }

    req.body = result.data;
    next();
  };
}
