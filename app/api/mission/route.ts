import { NextRequest, NextResponse } from "next/server";
import { listMissions, findMission, advanceMission, persistMission, missionBrief, stages } from "@/lib/pipeline";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (id) {
    const mission = await findMission(id);
    if (!mission) return NextResponse.json({ error: "not found" }, { status: 404 });
    return NextResponse.json({ mission, brief: missionBrief(mission) });
  }
  const missions = await listMissions();
  return NextResponse.json({ missions, briefs: missions.map(missionBrief) });
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as {
    id?: string;
    stage?: string;
    evidence?: string;
  } | null;
  if (!body?.id || !body?.stage) return NextResponse.json({ error: "id and stage required" }, { status: 400 });
  const mission = await findMission(body.id);
  if (!mission) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (!stages.includes(body.stage as never)) return NextResponse.json({ error: "unknown stage" }, { status: 400 });
  const updated = advanceMission(mission, body.stage as never, body.evidence ?? "accepted");
  await persistMission(updated);
  return NextResponse.json({ ok: true, mission: updated, brief: missionBrief(updated) });
}
