import { NextRequest, NextResponse } from "next/server";
import { scoreDiagnostic } from "@/lib/diagnostics";
import { appendLedger } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function readBody(body: { answers?: number[]; vertical?: string; source?: string | null; campaign?: string | null }): number[] {
  const raw = body.answers ?? [];
  return Array.from({ length: 7 }, (_, i) => {
    const v = raw[i];
    if (v === 0 || v === 1 || v === 2) return v;
    return 0;
  });
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as {
    answers?: number[];
    vertical?: string;
    source?: string | null;
    campaign?: string | null;
  } | null;
  if (!body) return NextResponse.json({ error: "invalid body" }, { status: 400 });
  const answers = readBody(body);
  const result = scoreDiagnostic(answers);
  const now = Date.now();
  await appendLedger({
    id: `led_${now.toString(36)}`,
    kind: "diagnostic",
    vertical: (body.vertical as never) ?? null,
    source: body.source ?? null,
    campaign: body.campaign ?? null,
    amount: 0,
    at: now,
  });
  return NextResponse.json({ ...result, answers });
}
