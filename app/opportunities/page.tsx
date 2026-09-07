"use client";

import { useEffect, useState } from "react";
import { Loader2, ScanSearch, Zap } from "lucide-react";
import type { Opportunity } from "@/lib/opportunities";

export default function OpportunitiesPage() {
  const [ranked, setRanked] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("");
  const [scanning, setScanning] = useState(false);
  const [detected, setDetected] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/opportunities")
      .then((r) => r.json())
      .then((d) => setRanked(d.ranked ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function scan() {
    if (!source.trim()) return;
    setScanning(true);
    const res = await fetch("/api/opportunities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source }),
    });
    const d = await res.json();
    setDetected(d.detected ?? []);
    setRanked(d.ranked ?? []);
    setScanning(false);
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <p className="chip text-emerald-300">Money-maker scanner</p>
      <h1 className="mt-5 text-4xl font-black sm:text-5xl">Find something that pays. Do it once. Automate it after.</h1>
      <p className="mt-5 max-w-3xl leading-8 text-neutral-300">
        We scan for real, automatable income opportunities — from content and gigs to get-paid tasks and products.
        Each one shows what you do once and how to hand it to a system after it works.
      </p>

      <div className="mt-10 card">
        <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Paste a source to scan (a video transcript, a job board, or keywords)</label>
        <textarea
          value={source}
          onChange={(e) => setSource(e.target.value)}
          rows={4}
          placeholder="e.g. affiliate marketing, print on demand, fiverr gig, youtube channel monetization…"
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm outline-none focus:border-emerald-300/50"
        />
        <button onClick={scan} disabled={scanning || !source.trim()} className="mt-4 flex items-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-black text-black">
          {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanSearch className="h-4 w-4" />} Scan for opportunities
        </button>
        {detected.length > 0 && (
          <p className="mt-4 text-sm text-neutral-400">
            Detected signals: {detected.map((d) => <span key={d} className="chip mr-2 text-emerald-300">{d}</span>)}
          </p>
        )}
      </div>

      {loading && <p className="mt-10 text-neutral-400">Scanning…</p>}

      {!loading && (
        <div className="mt-12 space-y-4">
          {ranked.map((o, i) => (
            <div key={o.id} className={`card ${o.verdict === "prime" ? "border-emerald-400/40" : ""}`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-lg font-black text-neutral-300">{i + 1}</span>
                  <div>
                    <h2 className="text-xl font-bold">{o.title}</h2>
                    <p className="text-xs text-neutral-500">{o.platform} · {o.pay}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black gold-grad">{o.score}</p>
                  <p className="text-xs uppercase tracking-widest text-emerald-300">{o.verdict}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300"><Zap className="h-4 w-4" /> Do once</p>
                  <p className="mt-2 text-sm text-neutral-300">{o.whatYouDoOnce}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold"><Zap className="h-4 w-4" /> Automate after</p>
                  <p className="mt-2 text-sm text-neutral-300">{o.automateAfter}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-500">
                <span className="chip">Time to first: {o.timeToFirst}</span>
                <span className="chip">Capital: {o.capital}</span>
                <span className="chip">Automation: {o.automation}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
