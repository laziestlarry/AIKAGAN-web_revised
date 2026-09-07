import Link from "next/link";
import { ArrowRight, Radar, ScanSearch, Sparkles, Workflow } from "lucide-react";
import { verticals } from "@/lib/verticals";

export default function Home() {
  return (
    <main className="bg-ink">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_10%,rgba(212,175,55,0.14),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <p className="chip text-emerald-300">Autonomous AI agency pipeline</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Find the pain. <span className="gold-grad">Sell the cure.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300">
            AIKAGAN hunts observable business pain where the buyer already owns a valuable asset, diagnoses it free,
            then builds a bounded cure. We run the factory: demand → diagnosis → production → QA → delivery → evidence.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/diagnose"
              className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-black text-black transition hover:brightness-110"
            >
              Free diagnosis <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/radar"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-bold"
            >
              Explore demand radar <Radar className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Three-step value */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: ScanSearch, t: "Diagnose free", b: "A short scan maps your observable pain, names the first broken gate and the highest-risk gate." },
            { icon: Workflow, t: "Bound a mission", b: "A contract defines outcome, scope, owner, acceptance and delivery — no fake instant checkout." },
            { icon: Sparkles, t: "Deliver & measure", b: "The right capability network composes, produces, QA-checks, delivers and records evidence." },
          ].map((x) => (
            <div key={x.t} className="card">
              <x.icon className="h-7 w-7 text-gold" />
              <h2 className="mt-5 text-2xl font-bold">{x.t}</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-400">{x.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Verticals / demand radar */}
      <section className="border-y border-white/5 bg-panel">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-sm font-semibold text-emerald-300">The factory</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-black">Every vertical is a pain-killer with a buyer who already has the asset.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {verticals.map((v) => (
              <Link key={v.id} href={`/rescue/${v.id}`} className="group card transition hover:border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{v.emoji}</span>
                  <span className="chip" style={{ color: v.accent, borderColor: `${v.accent}44` }}>
                    {v.audience.split(" ")[0]}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold group-hover:text-gold">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-400">{v.pain}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">{v.freeTool}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="text-sm font-semibold text-amber-300">A small transaction, a long relationship</p>
        <h2 className="mt-4 text-4xl font-black">Start with a free diagnosis. Expand when it works.</h2>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-neutral-400">
          We give away the method. The paid value is diagnosis depth, research, composition, production, QA and taking
          the workload off your plate.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/diagnose" className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-black text-black">
            Free diagnosis <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
