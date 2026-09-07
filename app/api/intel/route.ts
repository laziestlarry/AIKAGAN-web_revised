import { NextRequest, NextResponse } from "next/server";
import { scrapeSignals, transcribeIntelligence, extractProcess, intelProvider } from "@/lib/data-intel";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as {
    kind?: "scrape" | "transcribe" | "process";
    source?: string;
    audioRef?: string;
    text?: string;
  } | null;
  const kind = body?.kind ?? "scrape";
  if (kind === "scrape") {
    return NextResponse.json({ ...scrapeSignals(body?.source ?? ""), providerMode: intelProvider() });
  }
  if (kind === "transcribe") {
    return NextResponse.json({ ...transcribeIntelligence(body?.audioRef ?? "", body?.text ?? ""), providerMode: intelProvider() });
  }
  return NextResponse.json({ ...extractProcess(body?.text ?? ""), providerMode: intelProvider() });
}
