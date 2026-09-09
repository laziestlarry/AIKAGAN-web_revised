import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { listApprovals, saveApproval } from "@/lib/store";
import type { Approval } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const approvals = await listApprovals();
  return NextResponse.json({ approvals });
}

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => null)) as { action?: string; detail?: string; kind?: string } | null;
  if (!body?.action) return NextResponse.json({ error: "action required" }, { status: 400 });
  const approval: Approval = {
    id: `ap_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    action: body.action,
    detail: body.detail ?? "",
    kind: body.kind ?? "direction",
    status: "pending",
    requestedBy: user.id,
    createdAt: Date.now(),
    decidedAt: null,
  };
  await saveApproval(approval);
  return NextResponse.json({ ok: true, approval });
}
