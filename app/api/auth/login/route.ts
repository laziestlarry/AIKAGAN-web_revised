import { NextRequest, NextResponse } from "next/server";
import { cookieOptions, createSession, sanitize, SESSION_COOKIE, verifyPassword } from "@/lib/auth";
import { getUserByEmail } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { email?: string; password?: string } | null;
  if (!body?.email || !body?.password) {
    return NextResponse.json({ error: "email and password required" }, { status: 400 });
  }
  const user = await getUserByEmail(body.email.trim().toLowerCase());
  if (!user || !verifyPassword(body.password, user.salt, user.passHash)) {
    return NextResponse.json({ error: "invalid credentials" }, { status: 401 });
  }
  const token = await createSession(user.id);
  const res = NextResponse.json({ ok: true, user: sanitize(user) });
  res.cookies.set(SESSION_COOKIE, token, cookieOptions());
  return res;
}
