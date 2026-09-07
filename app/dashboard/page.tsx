"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { stages } from "@/lib/pipeline";
import type { Mission } from "@/lib/types";

interface Brief {
  id: string;
  stage: string;
  progress: number;
  next: string;
  gates: number;
}

export default function DashboardPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/mission")
      .then((r) => r.json())
      .then((d) => {
        setMissions(d.missions ?? []);
        setBriefs(d.briefs ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <p className="chip text-emerald-300">Mission console</p>
      <h1 className="mt-5 text-4xl font-black">Live pipeline state</h1>
      <p className="mt-5 max-w-3xl leading-8 text-neutral-300">
        Every mission flows through the autonomous AI agency pipeline. This is the visibility layer — not a vanity
        dashboard.
      </p>

      {loading && <p className="mt-10 text-neutral-400">Loading…</p>}

      {!loading && missions.length === 0 && (
        <div className="mt-10 card text-center">
          <Layers className="mx-auto h-8 w-8 text-gold" />
          <p className="mt-3 text-neutral-400">No missions yet.</p>
          <Link href="/genesis" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gold">
            Start a mission <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {!loading && missions.length > 0 && (
        <div className="mt-10 space-y-5">
          {missions.map((m, i) => (
            <div key={m.id} className="card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-neutral-500">{m.id}</p>
                  <h2 className="mt-1 text-xl font-bold">{m.objective}</h2>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-gold">{briefs[i]?.progress ?? 0}%</p>
                  <p className="text-xs text-neutral-500">next: {briefs[i]?.next ?? "Complete"}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {stages.map((s, idx) => (
                  <span
                    key={s}
                    className={`chip ${idx < (briefs[i]?.gates ?? 0) ? "border-emerald-400/40 text-emerald-300" : "text-neutral-500"}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 flex gap-3">
        <Link href="/genesis" className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-black text-black">
          Start a mission <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
