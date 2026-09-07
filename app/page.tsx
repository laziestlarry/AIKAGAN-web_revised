import Link from "next/link";
import { ArrowRight, Bot, ScanSearch, ShieldCheck, Workflow } from "lucide-react";
import { verticals } from "@/lib/verticals";

export default function Home() {
  return (
    <main className="bg-ink">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_10%,rgba(52,211,153,0.14),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <p className="chip text-emerald-300">Your money-making copilot</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            You run the business. <span className="intel-grad">We run the machine.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300">
            AutonomaX finds where you lose time and money, builds a bounded fix, and runs the whole factory behind
            you. Think of it as a co-pilot — it reads the weather, files the route and handles the thousand buttons,
            so you stay in charge.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/diagnose"
              className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-black text-black transition hover:brightness-110"
            >
              Find your biggest leak — free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/copilot"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-bold"
            >
              See the copilot <Bot className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Three-step value */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: ScanSearch, t: "Spot the leak", b: "A short scan maps your biggest time and money loss — free, and you keep the result." },
            { icon: Workflow, t: "Build the fix", b: "A bounded project with a clear outcome, scope and acceptance. No vague promises." },
            { icon: ShieldCheck, t: "Ship & verify", b: "Intelligence, control and assurance check the work before it reaches you. Evidence at every step." },
          ].map((x) => (
            <div key={x.t} className="card">
              <x.icon className="h-7 w-7 text-emerald-300" />
              <h2 className="mt-5 text-2xl font-bold">{x.t}</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-400">{x.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Verticals */}
      <section className="border-y border-white/5 bg-panel">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-sm font-semibold text-emerald-300">What we boost</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-black">A partner for whatever you already own.</h2>
          <p className="mt-4 max-w-3xl leading-8 text-neutral-400">
            We do not sell generic AI. We find the value you already have and help it work harder — one focused lane at
            a time.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {verticals.map((v) => (
              <Link key={v.id} href={`/boost/${v.id}`} className="group card transition hover:border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{v.emoji}</span>
                  <span className="chip" style={{ color: v.accent, borderColor: `${v.accent}44` }}>
                    {v.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold group-hover:text-emerald-300">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-400">{v.analogy}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">{v.freeTool}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="text-sm font-semibold text-amber-300">A small step, a long partnership</p>
        <h2 className="mt-4 text-4xl font-black">Start free. Expand when it pays off.</h2>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-neutral-400">
          We hand you the method for free. The paid value is doing the work — faster, verified, and off your plate.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/diagnose" className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-black text-black">
            Start free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
