"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, ChevronRight, Clock, ShieldCheck, X } from "lucide-react";

interface Mission {
  id: string;
  objective: string;
  stage: string;
  vertical: string;
  gates: { stage: string; done: boolean; evidence: string }[];
}
interface Approval {
  id: string;
  action: string;
  detail: string;
  kind: string;
  status: "pending" | "approved" | "rejected";
  createdAt: number;
}

export function CommanderDashboard() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [m, a] = await Promise.all([
      fetch("/api/mission").then((r) => r.json()).catch(() => ({})),
      fetch("/api/approvals").then((r) => r.json()).catch(() => ({})),
    ]);
    setMissions(m.missions ?? []);
    setApprovals(a.approvals ?? []);
  }, []);

  useEffect(() => { load(); }, [load]);

  function nextStage(m: Mission): string | undefined {
    const idx = m.gates.findIndex((g) => g.stage === m.stage);
    return m.gates[idx + 1]?.stage;
  }

  async function advance(m: Mission) {
    const target = nextStage(m);
    if (!target) return;
    setNotice(null);
    await fetch("/api/approvals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: `Advance ${m.id} to ${target}`,
        detail: m.objective,
        kind: "mission",
      }),
    });
    const res = await fetch("/api/mission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: m.id, stage: target }),
    });
    const data = await res.json();
    if (res.ok && data.mission) {
      setNotice(`Routed "${m.objective.slice(0, 40)}…" to ${target}`);
      load();
    }
  }

  async function decide(a: Approval, decision: "approved" | "rejected", missing: boolean) {
    if (missing) {
      await fetch("/api/approvals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: a.action, detail: a.detail, kind: a.kind }),
      });
    } else {
      await fetch(`/api/approvals/${a.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision }),
      });
    }
    setNotice(`Direction ${decision}.`);
    load();
  }

  const pending = approvals.filter((a) => a.status === "pending");
  const decided = approvals.filter((a) => a.status !== "pending");

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky to-steel">
          <ShieldCheck className="h-5 w-5 text-white" />
        </span>
        <div>
          <h1 className="text-3xl font-black">Commander</h1>
          <p className="text-neutral-400">Strategic routing + direction approval gates.</p>
        </div>
      </div>
      {notice && <p className="mt-4 rounded-xl border border-emerald/30 bg-emerald/10 px-4 py-2 text-sm font-semibold text-emerald">{notice}</p>}

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Strategic routing</h2>
            <span className="text-xs text-neutral-500">{missions.length} missions</span>
          </div>
          <div className="mt-4 space-y-3">
            {missions.length === 0 && <p className="text-sm text-neutral-500">No missions in flight.</p>}
            {missions.map((m) => {
              const target = nextStage(m);
              return (
                <div key={m.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">{m.objective}</p>
                      <p className="mt-1 text-xs text-neutral-500">{m.vertical} · {m.stage}</p>
                    </div>
                    <button
                      onClick={() => advance(m)}
                      disabled={!target}
                      className="flex items-center gap-1 rounded-lg bg-steel px-3 py-1.5 text-xs font-bold text-white hover:brightness-110 disabled:opacity-30"
                    >
                      {target ? (<>Route <ChevronRight className="h-3 w-3" /> {target}</>) : "Complete"}
                    </button>
                  </div>
                  <div className="mt-3 flex gap-1">
                    {m.gates.map((g, i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full ${g.done ? "bg-green" : i === m.gates.findIndex((x) => x.stage === m.stage) ? "bg-amber" : "bg-white/10"}`} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Direction approvals</h2>
            <span className="flex items-center gap-1 text-xs text-amber"><Clock className="h-3 w-3" /> {pending.length} pending</span>
          </div>
          <div className="mt-4 space-y-3">
            {pending.length === 0 && decided.length === 0 && <p className="text-sm text-neutral-500">No direction requests yet.</p>}
            {pending.map((a) => (
              <div key={a.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm font-semibold">{a.action}</p>
                {a.detail && <p className="mt-1 text-xs text-neutral-400">{a.detail}</p>}
                <p className="mt-1 text-[11px] text-neutral-500">Requested {new Date(a.createdAt).toLocaleString()}</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => decide(a, "approved", false)} className="flex items-center gap-1 rounded-lg bg-green px-3 py-1.5 text-xs font-bold text-black"><Check className="h-3 w-3" /> Approve</button>
                  <button onClick={() => decide(a, "rejected", false)} className="flex items-center gap-1 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-bold text-neutral-300"><X className="h-3 w-3" /> Reject</button>
                </div>
              </div>
            ))}
            {decided.slice(0, 5).map((a) => (
              <div key={a.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-300">{a.action}</span>
                  <span className={`chip ${a.status === "approved" ? "border-emerald/40 text-emerald" : "border-red/40 text-red-400"}`}>{a.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
