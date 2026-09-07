import { NextRequest, NextResponse } from "next/server";
import { profile } from "@/lib/personas";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { vertical?: string; answers?: number[] } | null;
  const vertical = body?.vertical ?? "creator-rescue";
  const answers = (body?.answers ?? []).map((v) => Math.max(0, Math.min(3, Number(v) || 0)));
  const result = profile(vertical, answers);
  return NextResponse.json(result);
}
