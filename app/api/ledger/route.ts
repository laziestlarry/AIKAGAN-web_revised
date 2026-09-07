import { NextResponse } from "next/server";
import { getLedger } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const ledger = await getLedger();
  const paid = ledger.filter((l) => l.kind === "paid");
  const intents = ledger.filter((l) => l.kind === "intent");
  const diagnostics = ledger.filter((l) => l.kind === "diagnostic");
  const traffic = ledger.filter((l) => l.kind === "traffic");
  return NextResponse.json({
    ledger,
    totals: {
      traffic: traffic.length,
      diagnostics: diagnostics.length,
      intents: intents.length,
      paid: paid.length,
      revenue: 0,
    },
  });
}
