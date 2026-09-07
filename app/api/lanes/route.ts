import { NextRequest, NextResponse } from "next/server";
import { lanes, runListingEngine } from "@/lib/lanes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ lanes });
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { lane?: string; vars?: Record<string, string> } | null;
  if (!body?.lane) return NextResponse.json({ error: "lane required" }, { status: 400 });
  const listing = runListingEngine(body.lane, body.vars ?? {});
  return NextResponse.json({ ok: true, lane: body.lane, listing });
}
