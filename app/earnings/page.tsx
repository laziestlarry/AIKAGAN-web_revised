"use client";

import { useEffect, useState } from "react";
import { BarChart3, TrendingUp } from "lucide-react";
import type { RankedOption } from "@/lib/earnings";

export default function EarningsPage() {
  const [ranked, setRanked] = useState<RankedOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/earnings")
      .then((r) => r.json())
      .then((d) => setRanked(d.ranked ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <p className="chip text-emerald-300">Smart earnings</p>
      <h1 className="mt-5 text-4xl font-black sm:text-5xl">Rank the machines, not the promises.</h1>
      <p className="mt-5 max-w-3xl leading-8 text-neutral-300">
        Each automated delivery option gets a composite score from margin, conversion, trend and reach — penalised by
        refunds and age. Highest score ships first.
      </p>

      {loading && <p className="mt-10 text-neutral-400">Scoring…</p>}

      {!loading && (
        <div className="mt-12 space-y-4">
          {ranked.map((o, i) => (
            <div key={o.id} className={`card ${o.verdict === "prime" ? "border-emerald-400/40" : ""}`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-lg font-black text-neutral-300">{i + 1}</span>
                  <div>
                    <h2 className="text-xl font-bold">{o.name}</h2>
                    <p className="text-xs text-neutral-500">lane · {o.lane}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black gold-grad">{o.score}</p>
                  <p className="text-xs uppercase tracking-widest text-emerald-300">{o.verdict}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ["Margin", o.margin],
                  ["Conversion", o.conversion],
                  ["Trend", o.trend],
                ].map(([k, v]) => (
                  <div key={k as string} className="rounded-xl border border-white/10 bg-black/20 px-4 py-2">
                    <p className="text-xs text-neutral-500">{k}</p>
                    <p className="text-lg font-bold">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 card">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300"><BarChart3 className="h-4 w-4" /> How it works</p>
        <p className="mt-3 text-sm leading-7 text-neutral-400">
          <span className="font-bold text-neutral-200">Profit OS modules invoked:</span> Profit Radar (rank the niche),
          Offer That Prints Money (bundle the deliverable), 60-Day Scale Sprint (weekly KPIs), Automation Money Machine
          (queue the production lane).
        </p>
        <p className="mt-2 flex items-center gap-2 text-sm text-neutral-400"><TrendingUp className="h-4 w-4 text-emerald-300" /> Higher score = more return per production hour.</p>
      </div>
    </main>
  );
}
