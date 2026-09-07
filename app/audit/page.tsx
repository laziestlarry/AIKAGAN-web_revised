"use client";

import { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import type { AuditVerdict } from "@/lib/audit";

export default function AuditPage() {
  const [input, setInput] = useState("");
  const [plan, setPlan] = useState("");
  const [output, setOutput] = useState("");
  const [result, setResult] = useState<AuditVerdict | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    const res = await fetch("/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, plan, output }),
    });
    setResult(await res.json());
    setLoading(false);
  }

  const providers = result ? [result.intelligence, result.control, result.assurance] : [];

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <p className="chip text-emerald-300">Quality audit · 3 providers</p>
      <h1 className="mt-5 text-4xl font-black">Intelligence. Control. Assurance.</h1>
      <p className="mt-5 max-w-3xl leading-8 text-neutral-300">
        A binding audit runs your input, plan and output through three checks in sequence. Each verifies a different
        face of the work — intent, guardrails and evidence — before anything ships.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="card">
          <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Input</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} placeholder="The problem or objective" className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm outline-none focus:border-emerald-300/50" />
        </div>
        <div className="card">
          <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Execution plan</label>
          <textarea value={plan} onChange={(e) => setPlan(e.target.value)} rows={4} placeholder="How you plan to do it" className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm outline-none focus:border-emerald-300/50" />
        </div>
        <div className="card">
          <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Output</label>
          <textarea value={output} onChange={(e) => setOutput(e.target.value)} rows={4} placeholder="What was produced / delivered" className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm outline-none focus:border-emerald-300/50" />
        </div>
      </div>

      <button onClick={run} disabled={loading || !input.trim()} className="mt-6 flex items-center gap-2 rounded-xl bg-gold px-6 py-4 text-sm font-black text-black">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />} Run the audit
      </button>

      {result && (
        <div className="mt-10 space-y-5">
          <div className="card border-gold/30">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">Overall score</p>
              <span className="chip border-emerald-400/40 text-emerald-300">{result.verdict}</span>
            </div>
            <p className="mt-3 text-5xl font-black gold-grad">{result.score}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {providers.map((p) => (
              <div key={p.provider} className="card">
                <div className="flex items-center justify-between">
                  <p className="font-bold">{p.provider}</p>
                  <span className="text-2xl font-black text-emerald-300">{p.score}</span>
                </div>
                <ul className="mt-3 space-y-1">
                  {p.findings.map((f) => (
                    <li key={f} className="text-xs text-neutral-400">• {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
