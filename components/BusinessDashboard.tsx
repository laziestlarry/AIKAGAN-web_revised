"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, CircleDollarSign, Layers, TrendingUp } from "lucide-react";
import { useAuth } from "./AuthProvider";

interface Order {
  id: string;
  offerSlug: string;
  amount: number;
  status: string;
  createdAt: number;
}
interface Ledger {
  id: string;
  kind: string;
  amount: number;
  at: number;
}
interface Mission {
  gates: { done: boolean }[];
}

export function BusinessDashboard() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ledger, setLedger] = useState<Ledger[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    fetch("/api/orders").then((r) => r.json()).then((d) => setOrders(d.orders ?? [])).catch(() => {});
    fetch("/api/ledger").then((r) => r.json()).then((d) => setLedger(d.ledger ?? [])).catch(() => {});
    fetch("/api/mission").then((r) => r.json()).then((d) => setMissions(d.missions ?? [])).catch(() => {});
  }, []);

  const paid = orders.filter((o) => o.status === "paid" || o.status === "fulfilled" || o.status === "accepted");
  const revenue = paid.reduce((a, o) => a + o.amount, 0);
  const paidEntries = ledger.filter((l) => l.kind === "paid").length;
  const intents = ledger.filter((l) => l.kind === "intent").length;
  const diag = ledger.filter((l) => l.kind === "diagnostic").length;
  const activeMissions = missions.filter((m) => !m.gates.every((g) => g.done)).length;

  if (loading) return <p className="py-20 text-center text-neutral-400">Loading…</p>;

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-black">Sign in to view your workspace</h1>
        <p className="mt-3 text-neutral-400">Create a free account to track your own business.</p>
        <Link href="/login" className="mt-6 inline-flex rounded-xl bg-steel px-6 py-3 text-sm font-black text-white">
          Sign in
        </Link>
      </div>
    );
  }

  const stats = [
    { label: "Diagnostics run", value: diag, icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Checkout intents", value: intents, icon: <Layers className="h-5 w-5" /> },
    { label: "Active missions", value: activeMissions, icon: <BarChart3 className="h-5 w-5" /> },
    { label: "Verified revenue", value: `$${revenue.toLocaleString()}`, icon: <CircleDollarSign className="h-5 w-5" /> },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex items-center justify-between">
        <div>
          <p className="chip text-sky">My business</p>
          <h1 className="mt-4 text-4xl font-black">Welcome, {user.name.split(" ")[0]}</h1>
          <p className="mt-2 text-neutral-400">Your own tracking dashboard — diagnoses, missions and revenue in one place.</p>
        </div>
        <span className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold">{user.email}</span>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card">
            <div className="flex items-center gap-2 text-sky">{s.icon}<span className="text-xs font-bold uppercase tracking-widest text-neutral-500">{s.label}</span></div>
            <p className="mt-3 text-3xl font-black">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent orders</h2>
            <span className="text-xs text-neutral-500">{orders.length}</span>
          </div>
          <div className="mt-4 space-y-2">
            {orders.length === 0 && <p className="text-sm text-neutral-500">No orders yet. Start with a free diagnosis.</p>}
            {orders.slice(0, 6).map((o) => (
              <div key={o.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">{o.offerSlug}</p>
                  <p className="text-xs text-neutral-500">{new Date(o.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gold">${o.amount}</p>
                  <p className="text-xs text-neutral-500">{o.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Lead funnel</h2>
            <span className="text-xs text-neutral-500">live</span>
          </div>
          <div className="mt-4 space-y-4">
            {[
              ["Diagnostics", diag],
              ["Intents", intents],
              ["Paid", paidEntries],
            ].map(([label, val]) => (
              <div key={label as string}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-300">{label}</span>
                  <span className="text-neutral-500">{val}</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-sky" style={{ width: `${Math.min(100, ((val as number) / Math.max(1, diag)) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <Link href="/diagnose" className="mt-6 flex items-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-black text-black">
            Run a diagnosis <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
