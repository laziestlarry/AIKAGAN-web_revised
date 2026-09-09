import { NextRequest, NextResponse } from "next/server";
import { cookieOptions, createSession, genSalt, hashPassword, sanitize, SESSION_COOKIE } from "@/lib/auth";
import { getUserByEmail, saveUser } from "@/lib/store";
import type { User } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedEmails = new Set(
  (process.env.COMMANDER_EMAILS || "commander@autonomax.app")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean),
);

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { email?: string; password?: string; name?: string } | null;
  if (!body?.email || !body?.password) {
    return NextResponse.json({ error: "email and password required" }, { status: 400 });
  }
  const email = body.email.trim().toLowerCase();
  const name = (body.name || email.split("@")[0]).trim();
  if (!email.includes("@") || body.password.length < 6) {
    return NextResponse.json({ error: "invalid email or password too short" }, { status: 400 });
  }
  const existing = await getUserByEmail(email);
  if (existing) return NextResponse.json({ error: "account already exists" }, { status: 409 });

  const salt = genSalt();
  const user: User = {
    id: `usr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    email,
    name,
    passHash: hashPassword(body.password, salt),
    salt,
    role: allowedEmails.has(email) ? "commander" : "user",
    owner: email,
    createdAt: Date.now(),
  };
  await saveUser(user);
  const token = await createSession(user.id);
  const res = NextResponse.json({ ok: true, user: sanitize(user) });
  res.cookies.set(SESSION_COOKIE, token, cookieOptions());
  return res;
}
