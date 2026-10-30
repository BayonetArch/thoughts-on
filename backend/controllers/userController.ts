import type { Request, Response } from "express";
import pool from "../lib/db";
import logger from "../lib/logger";
import PG from "pg";
import { createSession, deleteSession } from "../services/sessions";
import assert from "node:assert";

export function getCurrentUser(_req: Request, res: Response) {
  res.json({ ok: true, user: res.locals.user });
}

export async function registerUser(req: Request, res: Response) {
  const { username, password } = req.body;

  const passwordHash = await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 12,
  });

  let result;
  try {
    result = await pool.query(
      `INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *`,
      [username, passwordHash],
    );
  } catch (e) {
    if (e instanceof Error) {
      logger.error("Error registering user ", e.message);
    }

    if (e instanceof PG.DatabaseError && e.code === "23505") {
      logger.error("Error registering user: username already exists", e.detail);
      return res.status(409).json({
        ok: false,
        error: "Username already exists",
        usernameExists: true,
      });
    }

    logger.debug("Error registering user ", e);

    return res.status(500).json({ ok: false, error: "Something went wrong" });
  }

  if (result.rowCount === 0) {
    logger.error("Could not register user", result);
    return res.status(500).json({ ok: false, error: "Something went wrong" });
  }
  const user = result.rows[0];

  logger.info("Registered user: ", username, "with id:", user.id);
  res.status(201).json({ ok: true, user: { username: username, id: user.id } });
}

export async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;
  assert(
    username && password,
    "username and password required but undefined. This is not a expected behaviour",
  );
  let result;
  try {
    result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
  } catch (e) {
    logger.error("Got error while getting user\n", e);
    return res.status(500).json({ ok: false, error: "Something went wrong" });
  }
  const user = result.rows[0];

  if (!user || result.rowCount === 0) {
    return res.status(401).json({
      ok: false,
      error: "Invalid username or password",
    });
  }

  const ok = Bun.password.verify(password, user.password_hash);
  if (!ok) {
    return res.status(401).json({
      ok: false,
      error: "Invalid username or password",
    });
  }
  const { token, expiresAt } = await createSession(user.id);

  res.cookie("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
  });

  logger.debug("user logged in: ", username, "with id:", user.id);
  res.json({ ok: true, user: { username, id: user.id } });
}

export function logoutUser(req: Request, res: Response) {
  const token = req.cookies.session;
  if (token) deleteSession(token);

  res.clearCookie("session");
  res.json({ ok: true });
}
