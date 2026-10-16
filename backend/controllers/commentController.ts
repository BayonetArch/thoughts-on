import type { Request, Response } from "express";
import pool from "../db.ts";

export async function getComments(req: Request, res: Response) {
  let result;
  try {
    result = await pool.query("SELECT * FROM comments");
  } catch (e) {
    console.log("Got error while getting Comments\n", e);
    res.status(500).json({ ok: false, error: "Something went wrong" });
    return;
  }
  console.log("SENT: \n", result.rows);
  res.json({ ok: true, data: result.rows });
}

export async function getCommentsByID(req: Request, res: Response) {
  const id = req.params.id;
  let result;
  try {
    result = await pool.query("SELECT * FROM comments WHERE id = $1", [id]);
  } catch (e) {
    console.log("Got error while getting Comments\n", e);
    res.status(500).json({ ok: false, error: "Something went wrong" });
    return;
  }
  if (result.rows.length === 0) {
    res
      .status(404)
      .json({ ok: false, error: `Comment not found for the id '${id}'` });
    return;
  }
  console.log(`Got comment for id '${id}'`, result.rows[0]);
  res.json({ ok: true, data: result.rows });
}

export async function createComments(req: Request, res: Response) {
  const body = req.body;
  let result;
  try {
    result = await pool.query(
      "INSERT INTO comments (name, comment) VALUES ($1, $2) RETURNING *",
      [body.name, body.comment],
    );
  } catch (e) {
    console.log("Got error while creating comment\n", e);
    return res.status(500).json({ ok: false, error: "Something went wrong" });
  }

  console.log("Created comment", result.rows[0]);
  res.json({ ok: true, created: result.rows[0] });
}

// export function updateComments(req: Request, res: Response) {}

export async function deleteComments(req: Request, res: Response) {
  const id = req.params.id;
  let result;
  try {
    result = await pool.query("DELETE FROM comments WHERE id = $1", [id]);
  } catch (e) {
    console.log("Got error while deleting comment\n", e);
    return res.status(500).json({ ok: false, error: "Something went wrong" });
  }

  if (result.rowCount === 0) {
    res
      .status(404)
      .json({ ok: false, error: `Comment not found for the id '${id}'` });
    return;
  }

  res.json({ ok: true, deleted: { id: id } });
  console.log("Delete affected", result.rowCount, "rows");
  console.log("Deleted ID", id);
}
