import { NextResponse } from "next/server";
import { rankDeliveryOptions, sampleDeliveryOptions } from "@/lib/earnings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ranked: rankDeliveryOptions(sampleDeliveryOptions) });
}
