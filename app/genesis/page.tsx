import { Database, Network, ShieldCheck, Workflow } from "lucide-react";
import { GenesisMission } from "@/components/GenesisMission";
import { stages, stageDescription, cells } from "@/lib/pipeline";

export default function GenesisPage() {
  return (
    <main className="bg-ink">
      <section className="border-b border-white/5 bg-[radial-gradient(circle_at_70%_15%,rgba(212,175,55,0.14),transparent_40%)]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="chip text-emerald-300">Genesis · autonomous AI agency pipeline</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-black tracking-[-0.04em] sm:text-6xl">
            One objective. A composed value chain. <span className="gold-grad">Evidence at every gate.</span>
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">
            This is the operating model behind the longer customer journey: diagnose what matters, contract a bounded
            mission, compose the right capability network, deliver, verify, learn and only then expand.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Network, t: "Input", b: "A business objective, problem, opportunity, evidence or required outcome." },
            { icon: Workflow, t: "Process", b: "Bounded orchestration of intelligence, software, people, controls and delivery." },
            { icon: ShieldCheck, t: "Output", b: "A verified artifact, implemented process, accepted outcome or evidence-backed decision." },
          ].map((x) => (
            <div key={x.t} className="card">
              <x.icon className="h-7 w-7 text-gold" />
              <h2 className="mt-5 text-2xl font-bold">{x.t}</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-400">{x.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-panel">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-sm font-semibold text-emerald-300">Production gates</p>
          <h2 className="mt-3 max-w-4xl text-4xl font-black">The value chain becomes real only when each stage earns the next.</h2>
          <div className="mt-12 space-y-4">
            {stages.map((s, i) => (
              <div key={s} className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5 md:grid-cols-[70px_0.7fr_1.3fr] md:items-center">
                <span className="text-sm font-black text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-bold">{s}</h3>
                <p className="text-sm leading-6 text-neutral-400">{stageDescription[s]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-emerald-300">Capability network</p>
            <h2 className="mt-3 text-4xl font-black">The right capabilities for the mission</h2>
            <p className="mt-5 leading-8 text-neutral-400">
              We do not deploy every capability for every customer. We compose the smallest qualified value chain capable
              of producing the agreed outcome — then let the customer keep the decisions and expertise that belong to them.
            </p>
            <div className="mt-8 space-y-3">
              {cells.map((c) => (
                <div key={c.name} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <Database className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="font-bold">{c.name}</p>
                    <p className="text-sm text-neutral-400">{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="sticky top-24">
              <p className="text-sm font-semibold text-emerald-300">Open a mission</p>
              <h2 className="mt-3 text-3xl font-black">Start with the pain you already own</h2>
              <p className="mt-4 text-sm leading-7 text-neutral-400">
                Choose a vertical and describe the objective. A bounded mission is opened through the full pipeline with
                gates you can advance and evidence you can inspect.
              </p>
              <div className="mt-8">
                <GenesisMission />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
