import crypto from "node:crypto";
import pool from "../lib/db";
import logger from "../lib/logger";
const SESSION_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000;

function hashToken(token: string) {
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  return hash;
}

export async function createSession(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_LIFETIME_MS);
  const tokenHash = hashToken(token);

  if (!tokenHash) {
    logger.error("token hash is empty", tokenHash);
    throw new Error("token hash is empty");
  }
  await pool.query(
    `INSERT INTO sessions (user_id,token_hash,expires_at) VALUES ($1, $2, $3)`,
    [userId, tokenHash, expiresAt],
  );
  return { token, expiresAt };
}

export async function getUserBySessionToken(token: string) {
  const result = await pool.query(
    `SELECT users.id, users.username
     FROM sessions
     JOIN users ON users.id = sessions.user_id
     WHERE sessions.token_hash = $1 AND sessions.expires_at > now()`,
    [hashToken(token)],
  );
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}

export async function deleteSession(token: string) {
  await pool.query(`DELETE FROM sessions WHERE token_hash = $1`, [
    hashToken(token),
  ]);
}
