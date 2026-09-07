import { NextRequest, NextResponse } from "next/server";
import { getOffer } from "@/lib/products";
import { createCheckout } from "@/lib/payments";
import { createOrder, appendLedger } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function newId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as {
    slug?: string;
    email?: string | null;
    source?: string | null;
    campaign?: string | null;
  } | null;
  if (!body?.slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  const offer = getOffer(body.slug);
  if (!offer) return NextResponse.json({ error: "unknown offer" }, { status: 404 });
  if (offer.tier === "free") return NextResponse.json({ error: "free offer" }, { status: 400 });

  const orderId = newId("ord");
  const now = Date.now();
  const order = {
    id: orderId,
    offerSlug: offer.slug,
    amount: offer.priceUsd,
    currency: "usd",
    status: "intent" as const,
    rail: "",
    email: body.email ?? null,
    attribution: { source: body.source ?? null, campaign: body.campaign ?? null },
    evidence: { paymentId: null, webhook: null, delivery: null, acceptance: null },
    createdAt: now,
  };
  await createOrder(order);
  await appendLedger({ id: newId("led"), kind: "intent", vertical: offer.vertical, source: body.source ?? null, campaign: body.campaign ?? null, amount: offer.priceUsd, at: now });

  const checkout = await createCheckout({ offer, orderId, email: body.email ?? null, attribution: order.attribution });
  return NextResponse.json({ ok: true, orderId, rail: checkout.rail, url: checkout.url, simulated: checkout.simulated });
}
