"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Lightbulb, Loader2, Wrench } from "lucide-react";
import { diagnosticQuestions } from "@/lib/diagnostics";
import { getOffer } from "@/lib/products";
import type { DiagnosticResult } from "@/lib/types";

const options = [
  { value: 0, label: "No / unknown", desc: "Not present or unverified" },
  { value: 1, label: "Partly", desc: "Present but inconsistent" },
  { value: 2, label: "Yes, reliably", desc: "Operational and repeatable" },
];

export function DiagnosticFlow({ vertical }: { vertical?: string }) {
  const [answers, setAnswers] = useState<(0 | 1 | 2)[]>([]);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = diagnosticQuestions[step];

  function select(v: 0 | 1 | 2) {
    const next = [...answers];
    next[step] = v;
    setAnswers(next);
    if (step < diagnosticQuestions.length - 1) {
      setStep(step + 1);
    } else {
      submit(next);
    }
  }

  async function submit(a: (0 | 1 | 2)[]) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: a, vertical: vertical ?? null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "failed");
      setResult(data);
    } catch (e) {
      setError((e as Error).message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function restart() {
    setAnswers([]);
    setStep(0);
    setResult(null);
  }

  if (result) return <ResultView result={result} onRestart={restart} />;

  const pct = Math.round(((answers.filter((x) => x !== undefined).length) / diagnosticQuestions.length) * 100);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <p className="text-sm font-semibold text-neutral-400">
          Question {step + 1} of {diagnosticQuestions.length}
        </p>
        <div className="h-1.5 w-40 rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="card">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">{current.axis}</p>
        <h2 className="mt-3 text-2xl font-bold">{current.q}</h2>
        <p className="mt-2 text-sm text-neutral-400">{current.hint}</p>

        <div className="mt-6 space-y-3">
          {options.map((o) => (
            <button
              key={o.value}
              onClick={() => select(o.value as 0 | 1 | 2)}
              disabled={loading}
              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-left transition hover:border-gold/50 hover:bg-white/[0.05]"
            >
              <div>
                <p className="font-bold">{o.label}</p>
                <p className="text-xs text-neutral-500">{o.desc}</p>
              </div>
              <span className="text-xl text-neutral-500">›</span>
            </button>
          ))}
        </div>
        {loading && (
          <p className="mt-6 flex items-center gap-2 text-sm text-neutral-400">
            <Loader2 className="h-4 w-4 animate-spin" /> Diagnosing…
          </p>
        )}
        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
}

function ResultView({ result, onRestart }: { result: DiagnosticResult; onRestart: () => void }) {
  const matched = result.matchedOfferSlug ? getOffer(result.matchedOfferSlug) : null;
  const modeCopy: Record<string, string> = {
    foundation: "Foundation mode — build the smallest complete loop.",
    improvement: "Improvement mode — fix the weakest link first.",
    performance: "Performance mode — the loop works; compound it.",
  };
  return (
    <div className="mx-auto max-w-4xl">
      <div className="card border-gold/30">
        <div className="flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">Self-assessment</p>
          <span className="chip text-gold">{modeCopy[result.mode]}</span>
        </div>
        <div className="mt-4 flex items-end gap-4">
          <span className="text-6xl font-black gold-grad">{result.score}</span>
          <span className="pb-2 text-lg text-neutral-500">/ 100</span>
        </div>
        <p className="mt-4 text-lg leading-8 text-neutral-300">{result.summary}</p>
      </div>

      {result.priorities.map((p, i) => (
        <div key={p.gate} className="mt-6 card">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/20 text-sm font-black text-gold">{i + 1}</span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-neutral-500">Priority · {p.gate}</p>
              <h3 className="text-xl font-bold">{p.title}</h3>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-neutral-400">{p.why}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300"><Wrench className="h-4 w-4" /> Try it yourself</p>
              <p className="mt-2 text-sm leading-6 text-neutral-300">{p.diy}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold"><Lightbulb className="h-4 w-4" /> AIKAGAN can do it</p>
              <p className="mt-2 text-sm leading-6 text-neutral-300">{p.aikagan}</p>
            </div>
          </div>
        </div>
      ))}

      {matched && (
        <div className="mt-6 card border-gold/30">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-gold">Matched next step</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold">{matched.name}</h3>
              <p className="mt-1 text-sm text-neutral-400">{matched.description}</p>
            </div>
            <Link href={`/checkout?slug=${matched.slug}`} className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-black text-black">
              {matched.priceLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-3 text-xs text-neutral-500">{matched.fulfillmentWindow}</p>
        </div>
      )}

      <div className="mt-6 card">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300"><Lightbulb className="h-4 w-4" /> Ideation</p>
        <ul className="mt-3 space-y-2">
          {result.hypotheses.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-neutral-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> {h}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex gap-3">
        <button onClick={onRestart} className="rounded-xl border border-white/15 px-6 py-3 text-sm font-bold">
          Start a new scan
        </button>
        <Link href="/offers" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-black text-black">
          Browse all offers
        </Link>
      </div>
    </div>
  );
}
