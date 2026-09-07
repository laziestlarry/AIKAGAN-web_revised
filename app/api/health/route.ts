import { NextResponse } from "next/server";
import { isSimulated } from "@/lib/payments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    app: "aikagan-web-revised",
    version: "1.0.0",
    pipeline: "autonomous-ai-agency",
    paymentRail: isSimulated() ? "demo" : process.env.PAYMENT_RAIL,
    storefrontMode: "open",
    time: new Date().toISOString(),
  });
}
