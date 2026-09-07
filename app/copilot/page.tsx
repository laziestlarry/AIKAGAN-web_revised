import Link from "next/link";
import { ArrowRight, Bot, ShieldCheck } from "lucide-react";
import { stages, stageDescription, cells } from "@/lib/pipeline";
import { departments } from "@/lib/departments";
import { profitModules } from "@/lib/profitos";

export default function CopilotPage() {
  return (
    <main className="bg-ink">
      <section className="border-b border-white/5 bg-[radial-gradient(circle_at_70%_15%,rgba(52,211,153,0.14),transparent_40%)]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="chip text-emerald-300">The copilot · control room</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-black tracking-[-0.04em] sm:text-6xl">
            You stay the captain. <span className="intel-grad">We run the machine.</span>
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">
            AutonomaX is the operating system behind the work. It reads the weather, files the route, builds the fix,
            checks it and reports back. Here is the whole machine in one place.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/audit" className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-black text-black">
              Run a quality audit <ShieldCheck className="h-4 w-4" />
            </Link>
            <Link href="/earnings" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-bold">
              See earnings scoring <Bot className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-semibold text-emerald-300">The pipeline</p>
        <h2 className="mt-3 text-4xl font-black">Every step earns the next.</h2>
        <div className="mt-12 space-y-4">
          {stages.map((s, i) => (
            <div key={s} className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5 md:grid-cols-[70px_0.7fr_1.3fr] md:items-center">
              <span className="text-sm font-black text-emerald-300">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-lg font-bold">{s}</h3>
              <p className="text-sm leading-6 text-neutral-400">{stageDescription[s]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-panel">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-semibold text-emerald-300">Capability cells</p>
          <h2 className="mt-3 text-4xl font-black">The right team for the job.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {cells.map((c) => (
              <div key={c.name} className="card">
                <h3 className="text-lg font-bold">{c.name}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-400">{c.role}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">{c.stage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-emerald-300">Departments</p>
            <h2 className="mt-3 text-3xl font-black">Configured, not improvised.</h2>
            <div className="mt-8 space-y-3">
              {departments.map((d) => (
                <div key={d.id} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="min-w-0">
                    <p className="font-bold">{d.name}</p>
                    <p className="text-sm text-neutral-400">{d.analogy}</p>
                    <p className="mt-1 text-xs text-neutral-500">KPI: {d.kpi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-300">Profit OS modules</p>
            <h2 className="mt-3 text-3xl font-black">Every plan invokes a module.</h2>
            <div className="mt-8 space-y-3">
              {profitModules.map((m) => (
                <div key={m.id} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="min-w-0">
                    <p className="font-bold">{m.name}</p>
                    <p className="text-sm text-neutral-400">{m.summary}</p>
                    <p className="mt-1 text-xs font-mono text-neutral-500">{m.wiring}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
