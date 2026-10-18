import crypto from "node:crypto";
import pool from "../lib/db";
import logger from "../lib/logger";
const SESSION_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000;

async function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_LIFETIME_MS);
  await pool.query(
    `INSERT INTO sessions (user_id,token_hash, expires_at) VALUES ($1, $2, $3) RETURNING *`,
    [hashToken(token), userId, expiresAt],
  );
  return { token, expiresAt };
}
export async function getUserBySessionToken(token: string) {
  const result = await pool.query(`SELECT `);
}
