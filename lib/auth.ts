import { cookies } from "next/headers";
import crypto from "crypto";
import { deleteSession, getSession, getUserById, saveSession } from "./store";
import type { Session, User } from "./types";

export const SESSION_COOKIE = "ax_session";

export function genSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function hashPassword(pass: string, salt: string): string {
  return crypto.scryptSync(pass, salt, 64).toString("hex");
}

export function verifyPassword(pass: string, salt: string, hash: string): boolean {
  try {
    const a = Buffer.from(hashPassword(pass, salt), "hex");
    const b = Buffer.from(hash, "hex");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function genToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function sanitize(u: User): Omit<User, "passHash" | "salt"> {
  const { passHash, salt, ...rest } = u;
  return rest;
}

export function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === "production",
  };
}

/** Persists a session and returns the token. The caller sets the cookie. */
export async function createSession(userId: string): Promise<string> {
  const token = genToken();
  const session: Session = { token, userId, createdAt: Date.now() };
  await saveSession(session);
  return token;
}

export async function expireSession(token: string | undefined): Promise<void> {
  if (token) await deleteSession(token);
}

async function readToken(): Promise<string | undefined> {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

export async function currentUser(): Promise<User | null> {
  const token = await readToken();
  if (!token) return null;
  const session = await getSession(token);
  if (!session) return null;
  return (await getUserById(session.userId)) ?? null;
}

export function requireAuth(u: User | null): u is User {
  return Boolean(u);
}
