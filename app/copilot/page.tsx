import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, ScanSearch, ShieldCheck, Workflow } from "lucide-react";
import { verticals } from "@/lib/verticals";

export default function CopilotPage() {
  return (
    <main className="bg-ink">
      <section className="border-b border-white/5 bg-[radial-gradient(circle_at_70%_15%,rgba(52,211,153,0.14),transparent_40%)]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="chip text-emerald-300">How AutonomaX works</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-black tracking-[-0.04em] sm:text-6xl">
            You stay the captain. <span className="intel-grad">We run the machine.</span>
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300">
            AutonomaX is a partner, not a dashboard. We look at your situation, build a bounded fix, run the whole
            factory behind you, and hand you a verified result. Here's how it works in plain terms.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/diagnose" className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-black text-black">
              Profile me free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/opportunities" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-bold">
              Find opportunities <Bot className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: ScanSearch, t: "We look first", b: "A short, lane-specific profile shows where you stand and what's costing you — free, and you keep it." },
            { icon: Workflow, t: "We build a bounded fix", b: "One clear outcome with scope, deadline and acceptance. No vague promises, no bloated scope." },
            { icon: ShieldCheck, t: "We verify before it ships", b: "Our work is checked by an intelligence, control and assurance pass before it ever reaches you." },
          ].map((x) => (
            <div key={x.t} className="card">
              <x.icon className="h-7 w-7 text-emerald-300" />
              <h2 className="mt-5 text-2xl font-bold">{x.t}</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-400">{x.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-panel">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-sm font-semibold text-emerald-300">Why we exist</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-black">You don't need another AI tool. You need someone to take the boring work off your plate.</h2>
          <p className="mt-5 max-w-3xl leading-8 text-neutral-400">
            Most people spend their week repeating the same robotic actions — writing, formatting, posting, chasing,
            fixing. AutonomaX finds the repetitive parts, does the first one with you, and then automates it so it
            keeps running.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              "Find the leak before it costs more",
              "Turn one good idea into something that pays",
              "Hand the repetitive load to a system",
              "Get a verified result, not a promise",
            ].map((x) => (
              <div key={x} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-neutral-300">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" /> {x}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-semibold text-emerald-300">What we boost</p>
        <h2 className="mt-3 text-4xl font-black">A partner for whatever you already own.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {verticals.map((v) => (
            <Link key={v.id} href={`/boost/${v.id}`} className="group card transition hover:border-white/20">
              <span className="text-3xl">{v.emoji}</span>
              <h3 className="mt-4 text-xl font-bold group-hover:text-emerald-300">{v.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-400">{v.analogy}</p>
              <p className="mt-3 text-xs font-semibold text-emerald-300">See the lane →</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
