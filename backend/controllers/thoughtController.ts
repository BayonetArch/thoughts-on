import type { Request, Response } from "express";
import pool from "../lib/db.ts";
import logger from "../lib/logger.ts";

export async function getThoughts(req: Request, res: Response) {
  let result;
  try {
    result = await pool.query("SELECT * FROM thoughts");
  } catch (e) {
    logger.error("Got error while getting thoughts: ", e);
    res.status(500).json({ ok: false, error: "Something went wrong" });
    return;
  }
  logger.info("SENT: ", result.rows);
  res.json({ ok: true, data: result.rows });
}

export async function getThoughtsByID(req: Request, res: Response) {
  const id = req.params.id;
  let result;
  try {
    result = await pool.query("SELECT * FROM thoughts WHERE id = $1", [id]);
  } catch (e) {
    logger.error("Got error while getting thoughts ", e);
    res.status(500).json({ ok: false, error: "Something went wrong" });
    return;
  }
  if (result.rows.length === 0) {
    res
      .status(404)
      .json({ ok: false, error: `thought not found for the id '${id}'` });
    return;
  }
  logger.info(`Got thought for id '${id}'`, result.rows[0]);
  res.json({ ok: true, data: result.rows });
}

export async function createThoughts(req: Request, res: Response) {
  const body = req.body;
  let result;
  try {
    result = await pool.query(
      "INSERT INTO thoughts (name, thought) VALUES ($1, $2) RETURNING *",
      [body.name, body.thought],
    );
  } catch (e) {
    logger.info("Got error while creating thought\n", e);
    return res.status(500).json({ ok: false, error: "Something went wrong" });
  }

  logger.info("Created thought", result.rows[0]);
  res.json({ ok: true, created: result.rows[0] });
}

// export function updatethoughts(req: Request, res: Response) {}

export async function deleteThoughts(req: Request, res: Response) {
  const id = req.params.id;
  let result;
  try {
    result = await pool.query("DELETE FROM thoughts WHERE id = $1", [id]);
  } catch (e) {
    logger.error("Got error while deleting the thought\n", e);
    return res.status(500).json({ ok: false, error: "Something went wrong" });
  }

  if (result.rowCount === 0) {
    res
      .status(404)
      .json({ ok: false, error: `thought not found for the id '${id}'` });
    return;
  }

  res.json({ ok: true, deleted: { id: id } });
  logger.info("Delete affected", result.rowCount, "rows");
  logger.info("Deleted ID", id);
}
