"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Download, Loader2, PartyPopper } from "lucide-react";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-6 py-24 text-center text-neutral-400">Loading…</div>}>
      <SuccessInner />
    </Suspense>
  );
}

function SuccessInner() {
  const params = useSearchParams();
  const orderId = params.get("order");
  const [state, setState] = useState<"paid" | "fulfilled" | "accepted">("paid");
  const [busy, setBusy] = useState(false);

  async function confirm(event: "fulfilled" | "accepted") {
    if (!orderId) return;
    setBusy(true);
    await fetch("/api/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, orderId }),
    });
    setState(event);
    setBusy(false);
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <div className="text-center">
        <PartyPopper className="mx-auto h-10 w-10 text-gold" />
        <h1 className="mt-4 text-3xl font-black">Your mission is active</h1>
        <p className="mt-2 text-neutral-400">Order <span className="font-mono text-neutral-200">{orderId}</span></p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { label: "Payment", done: state !== "paid" || true },
          { label: "Delivery", done: state === "fulfilled" || state === "accepted" },
          { label: "Acceptance", done: state === "accepted" },
        ].map((s) => (
          <div key={s.label} className={`card ${s.done ? "border-emerald-400/40" : ""}`}>
            <CheckCircle2 className={`h-6 w-6 ${s.done ? "text-emerald-300" : "text-neutral-600"}`} />
            <p className="mt-3 text-sm font-bold">{s.label}</p>
            <p className="mt-1 text-xs text-neutral-500">{s.done ? "Complete" : "Pending"}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 card">
        <h2 className="text-xl font-bold">Next: delivery</h2>
        <p className="mt-2 text-sm leading-7 text-neutral-400">
          {state === "paid" && "Payment verified. Delivery is being prepared."}
          {state === "fulfilled" && "Delivered. Confirm acceptance to close the loop."}
          {state === "accepted" && "Accepted. The mission is complete — ready for the next step or a referral."}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {state === "paid" && (
            <button onClick={() => confirm("fulfilled")} disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-black text-black">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />} Mark delivered
            </button>
          )}
          {state === "fulfilled" && (
            <button onClick={() => confirm("accepted")} disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-black text-black">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />} Confirm acceptance
            </button>
          )}
          {state === "accepted" && (
            <button onClick={() => confirm("fulfilled")} className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-black text-black">
              Start again
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
