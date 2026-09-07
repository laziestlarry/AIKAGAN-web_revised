import { NextRequest, NextResponse } from "next/server";
import { rankOpportunities, scanSource } from "@/lib/opportunities";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const filter = req.nextUrl.searchParams.get("filter") ?? undefined;
  return NextResponse.json({ ranked: rankOpportunities(filter) });
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { source?: string; filter?: string } | null;
  if (body?.source?.trim()) {
    return NextResponse.json({ ...scanSource(body.source), ranked: rankOpportunities() });
  }
  return NextResponse.json({ ranked: rankOpportunities(body?.filter) });
}
