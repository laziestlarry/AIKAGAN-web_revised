import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { listApprovals, saveApproval } from "@/lib/store";
import type { Approval } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_TOKENS = new Set((process.env.COMMANDER_TOKENS || "").split(",").map((s) => s.trim()).filter(Boolean));

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await currentUser();
  const body = (await req.json().catch(() => null)) as { decision?: "approved" | "rejected" } | null;
  if (!user || (!user.role || user.role !== "commander")) {
    return NextResponse.json({ error: "commander role required" }, { status: 403 });
  }
  if (!body?.decision) return NextResponse.json({ error: "decision required" }, { status: 400 });

  const all = await listApprovals();
  const target = all.find((a) => a.id === id);
  if (!target) return NextResponse.json({ error: "not found" }, { status: 404 });

  const updated: Approval = { ...target, status: body.decision, decidedAt: Date.now() };
  await saveApproval(updated);
  return NextResponse.json({ ok: true, approval: updated });
}
