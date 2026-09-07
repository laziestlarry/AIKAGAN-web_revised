"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { stages, stageDescription } from "@/lib/pipeline";
import { verticals, getVertical } from "@/lib/verticals";
import type { Mission } from "@/lib/types";

export function GenesisMission() {
  const [objective, setObjective] = useState("");
  const [vertical, setVertical] = useState("creator-rescue");
  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!objective.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objective: objective.trim(), vertical }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "failed");
      setMission(data.mission);
    } catch (e) {
      setError((e as Error).message ?? "Intake failed");
    } finally {
      setLoading(false);
    }
  }

  async function advance(stage: string) {
    if (!mission) return;
    setLoading(true);
    const res = await fetch("/api/mission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: mission.id, stage, evidence: "accepted" }),
    });
    const data = await res.json();
    if (res.ok) setMission(data.mission);
    setLoading(false);
  }

  if (mission) {
    const v = getVertical(mission.vertical);
    return (
      <div className="card border-gold/30">
        <div className="flex items-center justify-between">
          <span className="chip text-gold">{v?.emoji} {v?.title}</span>
          <span className="font-mono text-xs text-neutral-500">{mission.id}</span>
        </div>
        <h3 className="mt-4 text-2xl font-bold">{mission.objective}</h3>

        <div className="mt-6 space-y-2">
          {mission.gates.map((g) => (
            <div key={g.stage} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              <div>
                <p className="text-sm font-bold">{g.stage}</p>
                <p className="text-xs text-neutral-500">{stageDescription[g.stage as keyof typeof stageDescription]}</p>
              </div>
              {g.done ? (
                <span className="chip border-emerald-400/40 text-emerald-300">done</span>
              ) : (
                <button
                  onClick={() => advance(g.stage)}
                  disabled={loading || mission.stage !== g.stage}
                  className="chip border-white/15 text-gold transition hover:border-gold/50 disabled:opacity-40"
                >
                  {mission.stage === g.stage ? "Advance" : "locked"}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {mission.cells.map((c) => (
            <div key={c.name} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
              <p className="flex items-center gap-2 text-sm font-bold"><Sparkles className="h-4 w-4 text-gold" /> {c.name}</p>
              <p className="mt-1 text-xs text-neutral-500">{c.role}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">1 · Choose the pain</label>
      <div className="mt-3 flex flex-wrap gap-2">
        {verticals.map((v) => (
          <button
            key={v.id}
            onClick={() => setVertical(v.id)}
            className={`chip transition ${vertical === v.id ? "border-gold/60 text-gold" : "text-neutral-400"}`}
          >
            {v.emoji} {v.title}
          </button>
        ))}
      </div>

      <label className="mt-6 block text-xs font-bold uppercase tracking-widest text-neutral-500">2 · State the objective</label>
      <textarea
        value={objective}
        onChange={(e) => setObjective(e.target.value)}
        rows={3}
        placeholder="e.g. My channel is flat. I want to know what to produce next."
        className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm outline-none focus:border-gold/50"
      />

      <button onClick={submit} disabled={loading || !objective.trim()} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-6 py-4 text-sm font-black text-black">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />} Open a bounded mission
      </button>
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
    </div>
  );
}
