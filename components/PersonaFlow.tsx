"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { personaLanes, profile } from "@/lib/personas";
import { getOffer } from "@/lib/products";
import type { PersonaProfile } from "@/lib/personas";

export function PersonaFlow({ initialVertical }: { initialVertical?: string }) {
  const [laneId, setLaneId] = useState<string | null>(initialVertical ?? null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PersonaProfile | null>(null);

  const lane = personaLanes.find((l) => l.id === laneId);

  function pickLane(id: string) {
    setLaneId(id);
    setAnswers([]);
    setStep(0);
    setResult(null);
  }

  function choose(v: number) {
    const next = [...answers];
    next[step] = v;
    setAnswers(next);
    if (step < (lane?.questions.length ?? 1) - 1) {
      setStep(step + 1);
    } else {
      submit(next);
    }
  }

  async function submit(a: number[]) {
    setLoading(true);
    const res = await fetch("/api/persona", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vertical: laneId, answers: a }),
    });
    setResult(await res.json());
    setLoading(false);
  }

  if (result) return <ResultView result={result} onRestart={() => pickLane(laneId!)} />;

  if (!lane) {
    return (
      <div>
        <p className="text-sm font-semibold text-neutral-400">Pick what you want us to look at</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {personaLanes.map((l) => (
            <button key={l.id} onClick={() => pickLane(l.id)} className="card text-left transition hover:border-emerald-300/50">
              <span className="text-3xl">{l.emoji}</span>
              <h3 className="mt-4 text-xl font-bold">{l.title}</h3>
              <p className="mt-1 text-sm text-neutral-400">{l.headline}</p>
              <p className="mt-4 text-xs font-semibold text-emerald-300">Profile me →</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const q = lane.questions[step];
  const pct = Math.round(((answers.filter((x) => x !== undefined).length) / lane.questions.length) * 100);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <p className="text-sm font-semibold text-neutral-400">
          {lane.emoji} {lane.title} · question {step + 1} of {lane.questions.length}
        </p>
        <div className="h-1.5 w-40 rounded-full bg-white/10">
          <div className="h-full rounded-full bg-emerald-300 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="card">
        <h2 className="text-2xl font-bold">{q.text}</h2>
        <div className="mt-6 space-y-3">
          {q.options.map((o, i) => (
            <button
              key={o}
              onClick={() => choose(i)}
              disabled={loading}
              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-left transition hover:border-emerald-300/50 hover:bg-white/[0.05]"
            >
              <span className="font-bold">{o}</span>
              <span className="text-xl text-neutral-500">›</span>
            </button>
          ))}
        </div>
        {loading && <p className="mt-6 flex items-center gap-2 text-sm text-neutral-400"><Loader2 className="h-4 w-4 animate-spin" /> Building your profile…</p>}
      </div>
    </div>
  );
}

function ResultView({ result, onRestart }: { result: PersonaProfile; onRestart: () => void }) {
  const offer = getOffer(result.matchedOfferSlug);
  return (
    <div className="mx-auto max-w-4xl">
      <div className="card border-emerald-300/30">
        <div className="flex items-center justify-between">
          <span className="chip text-emerald-300">{result.emoji} {result.lane} profile</span>
          <span className="text-3xl font-black gold-grad">{result.score}</span>
        </div>
        <h2 className="mt-4 text-3xl font-black">{result.headline}</h2>
        <p className="mt-3 text-lg leading-8 text-neutral-300">{result.situation}</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="card">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Where you stand</p>
          <div className="mt-4 space-y-3">
            {result.signals.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-300">{s.label}</span>
                  <span className="text-neutral-500">{s.strength}</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-emerald-300" style={{ width: `${s.strength}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">What we see</p>
          <ul className="mt-4 space-y-2">
            {result.strengths.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-neutral-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 card">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Highest-leverage moves</p>
        <div className="mt-4 space-y-3">
          {result.focus.map((f) => (
            <div key={f.title} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <h3 className="font-bold">{f.title}</h3>
              <p className="mt-1 text-sm text-neutral-400">{f.why}</p>
              <p className="mt-2 text-sm text-neutral-300">{f.move}</p>
            </div>
          ))}
        </div>
      </div>

      {offer && (
        <div className="mt-6 card border-gold/30">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold">A natural next step</p>
              <h3 className="mt-2 text-2xl font-bold">{offer.name}</h3>
              <p className="mt-1 text-sm text-neutral-400">{offer.description}</p>
            </div>
            <Link href={`/checkout?slug=${offer.slug}`} className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-black text-black">
              {offer.priceLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-3 text-xs text-neutral-500">{offer.fulfillmentWindow}</p>
        </div>
      )}

      <div className="mt-8 flex gap-3">
        <button onClick={onRestart} className="rounded-xl border border-white/15 px-6 py-3 text-sm font-bold">
          Profile another lane
        </button>
        <Link href="/opportunities" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-black text-black">
          <Sparkles className="h-4 w-4" /> Find money-making opportunities
        </Link>
      </div>
    </div>
  );
}
