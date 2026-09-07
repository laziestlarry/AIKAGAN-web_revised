import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { verticals } from "@/lib/verticals";

// Market-fit heuristic: observable pain × audience equity × commercial niche ×
// repeatability. Illustrative ranking, not a prediction.
const fit: Record<string, number> = {
  "creator-rescue": 86,
  "store-rescue": 82,
  "agency-rescue": 78,
  "expert-rescue": 80,
  "local-rescue": 72,
  "saas-rescue": 75,
};

export default function RadarPage() {
  const ranked = [...verticals].sort((a, b) => (fit[b.id] ?? 0) - (fit[a.id] ?? 0));
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <p className="chip text-emerald-300">Opportunity radar</p>
      <h1 className="mt-5 text-4xl font-black sm:text-5xl">Where the value is waiting</h1>
      <p className="mt-5 max-w-3xl leading-8 text-neutral-300">
        We look for owners of something valuable who are leaving money on the table. Ranked by pain × equity × niche ×
        repeatability — not by manufactured fear.
      </p>

      <div className="mt-12 space-y-4">
        {ranked.map((v) => {
          const score = fit[v.id] ?? 70;
          return (
            <Link key={v.id} href={`/boost/${v.id}`} className="group grid gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 md:grid-cols-[64px_1fr_180px_120px] md:items-center">
              <span className="text-4xl">{v.emoji}</span>
              <div>
                <h2 className="text-xl font-bold group-hover:text-gold">{v.title}</h2>
                <p className="mt-1 text-sm text-neutral-400">{v.pain}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">{v.symptom}</p>
              </div>
              <div className="md:text-right">
                <p className="text-xs uppercase tracking-widest text-neutral-500">Market fit</p>
                <p className="text-2xl font-black text-gold">{score}</p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${score}%` }} />
                </div>
              </div>
              <span className="inline-flex items-center justify-end gap-1 text-sm font-semibold text-neutral-400 group-hover:text-white">
                Open <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
