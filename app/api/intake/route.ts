import { NextRequest, NextResponse } from "next/server";
import { createMission, persistMission } from "@/lib/pipeline";
import { appendLedger } from "@/lib/store";
import type { VerticalId } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as {
    vertical?: string;
    objective?: string;
    source?: string | null;
    campaign?: string | null;
  } | null;
  if (!body?.objective) return NextResponse.json({ error: "objective required" }, { status: 400 });
  const vertical = (body.vertical as VerticalId) ?? "creator-rescue";
  const mission = createMission(vertical, body.objective);
  await persistMission(mission);
  await appendLedger({ id: `led_${Date.now().toString(36)}`, kind: "intent", vertical, source: body.source ?? null, campaign: body.campaign ?? null, amount: 0, at: Date.now() });
  return NextResponse.json({ ok: true, mission });
}
