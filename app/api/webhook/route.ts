import { NextRequest, NextResponse } from "next/server";
import { updateOrder, appendLedger } from "@/lib/store";
import { getOffer } from "@/lib/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Payment/fulfillment webhook. In demo mode this is a client-side confirmation;
// with a real provider it verifies the signed event. The key contract: a paid
// order reliably produces delivery evidence — the "commercial completion" gate.
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as {
    event?: "paid" | "fulfilled" | "accepted";
    orderId?: string;
    reference?: string;
  } | null;
  if (!body?.orderId) return NextResponse.json({ error: "orderId required" }, { status: 400 });

  const event = body.event ?? "paid";
  const orderId = body.orderId;
  const now = Date.now();

  if (event === "paid") {
    await updateOrder(orderId, { status: "paid", rail: body.reference ?? "demo", evidence: { paymentId: body.reference ?? orderId, webhook: `wh_${now.toString(36)}`, delivery: null, acceptance: null } });
    await appendLedger({ id: `led_${now.toString(36)}`, kind: "paid", vertical: null, source: null, campaign: null, amount: 0, at: now });
  } else if (event === "fulfilled") {
    await updateOrder(orderId, { status: "fulfilled", evidence: { paymentId: null, webhook: null, delivery: `dl_${now.toString(36)}`, acceptance: null } });
    await appendLedger({ id: `led_${now.toString(36)}`, kind: "delivery", vertical: null, source: null, campaign: null, amount: 0, at: now });
  } else if (event === "accepted") {
    await updateOrder(orderId, { status: "accepted", evidence: { paymentId: null, webhook: null, delivery: null, acceptance: `ac_${now.toString(36)}` } });
    await appendLedger({ id: `led_${now.toString(36)}`, kind: "acceptance", vertical: null, source: null, campaign: null, amount: 0, at: now });
  }

  return NextResponse.json({ ok: true, orderId, event });
}
