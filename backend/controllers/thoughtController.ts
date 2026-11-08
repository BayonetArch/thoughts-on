import type { Request, Response } from "express";
import pool from "../lib/db.ts";
import logger from "../lib/logger.ts";

export async function getThoughts(_req: Request, res: Response) {
  let result;
  try {
    result = await pool.query(
      `SELECT user_id,username,thoughts.id,thoughts.thought,thoughts.created_at
      FROM thoughts
      JOIN users
      ON thoughts.user_id = users.id;`,
    );
  } catch (e) {
    logger.error("Got error while getting thoughts: ", e);
    res.status(500).json({ ok: false, error: "Something went wrong" });
    return;
  }

  logger.info("SENT: ", result.rows);

  res.json({ ok: true, thoughts: result.rows });
}

export async function myThoughts(_req: Request, res: Response) {
  const user_id = res.locals.user.id;

  if (user_id === null || user_id === undefined) {
    res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  let result;
  try {
    result = await pool.query("SELECT * FROM thoughts WHERE user_id = $1", [
      user_id,
    ]);
  } catch (e) {
    logger.error("Got error while getting thoughts ", e);
    res.status(500).json({ ok: false, error: "Something went wrong" });
    return;
  }

  logger.info(`Got thought for id '${user_id}'`, result.rows[0]);
  res.json({ ok: true, thoughts: result.rows });
}

export async function createThoughts(req: Request, res: Response) {
  const body = req.body;
  const user_id = res.locals.user.id;

  if (user_id === null || user_id === undefined) {
    res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  let result;
  try {
    result = await pool.query(
      "INSERT INTO thoughts (user_id,thought) VALUES ($1,$2) RETURNING *",
      [user_id, body.thought],
    );
  } catch (e) {
    logger.info("Got error while creating thought\n", e);
    return res.status(500).json({ ok: false, error: "Something went wrong" });
  }

  logger.info("Created thought", result.rows[0]);
  res.json({ ok: true, created: { thought: result.rows[0] } });
}

// export function updatethoughts(req: Request, res: Response) {}
export async function deleteThoughts(req: Request, res: Response) {
  const user_id = res.locals.user.id;
  const id = req.params.id;

  if (user_id === null || user_id === undefined) {
    res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  let result;
  try {
    result = await pool.query(
      "DELETE FROM thoughts WHERE user_id = $1 and id = $2",
      [user_id, id],
    );
  } catch (e) {
    logger.error("Got error while deleting the thought\n", e);
    return res.status(404).json({ ok: false, error: "thought not found" });
  }

  if (result.rowCount === 0) {
    res.status(404).json({ ok: false, error: "thought not found" });
    return;
  }

  res.json({ ok: true, deleted: { id: id } });

  logger.info("Delete affected", result.rowCount, "rows");
  logger.info("Deleted ID", id);
}
