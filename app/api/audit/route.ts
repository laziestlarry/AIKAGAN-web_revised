import { NextRequest, NextResponse } from "next/server";
import { runAudit, providerMode } from "@/lib/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { input?: string; plan?: string; output?: string } | null;
  if (!body?.input && !body?.plan && !body?.output) {
    return NextResponse.json({ error: "provide input, plan or output" }, { status: 400 });
  }
  const verdict = runAudit({ input: body.input ?? "", plan: body.plan ?? "", output: body.output ?? "" });
  return NextResponse.json({ ...verdict, providerMode: providerMode() });
}
