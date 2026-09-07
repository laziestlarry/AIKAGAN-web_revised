import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { verticals, getVertical } from "@/lib/verticals";
import { offersByVertical } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return verticals.map((v) => ({ vertical: v.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ vertical: string }> }) {
  const { vertical } = await params;
  const v = getVertical(vertical);
  return { title: v ? `${v.title} — AutonomaX` : "AutonomaX" };
}

export default async function BoostPage({ params }: { params: Promise<{ vertical: string }> }) {
  const { vertical } = await params;
  const v = getVertical(vertical);
  if (!v) return <main className="mx-auto max-w-3xl px-6 py-24">Lane not found.</main>;
  const offers = offersByVertical(v.id);
  const primary = offers[0];

  return (
    <main className="bg-ink">
      <section className="border-b border-white/5" style={{ background: `radial-gradient(circle at 75% 15%, ${v.accent}1f, transparent 40%)` }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="chip" style={{ color: v.accent }}>{v.emoji} {v.audience}</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black sm:text-6xl">{v.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-300">{v.analogy}</p>
          <p className="mt-4 max-w-3xl leading-8 text-neutral-400">{v.pain}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Free", v.freeTool, "A useful scan you keep."],
              ["Boost", v.paidOffer, "A bounded outcome with acceptance."],
              ["Engine", v.engine, "The machine that does the work."],
            ].map(([k, t, b]) => (
              <div key={k} className="card">
                <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: v.accent }}>{k}</p>
                <h3 className="mt-2 text-lg font-bold">{t}</h3>
                <p className="mt-1 text-sm text-neutral-400">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-black">The partner proposition</h2>
            <p className="mt-5 leading-8 text-neutral-400">{v.proof}</p>
            <ul className="mt-6 space-y-3">
              {[
                "Free scan before any ask",
                "Bounded scope with acceptance criteria",
                "Intelligence, control and assurance at each step",
                "You stay the captain",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3 text-sm text-neutral-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" /> {x}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/diagnose" className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-black text-black">
                Run the free scan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            {primary && (
              <div className="card border-gold/30">
                <div className="flex items-center justify-between">
                  <span className="chip text-gold">{primary.badge}</span>
                  <span className="text-2xl font-black text-gold">{primary.priceLabel}</span>
                </div>
                <h3 className="mt-4 text-2xl font-bold">{primary.name}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-400">{primary.description}</p>
                <ul className="mt-5 space-y-2">
                  {primary.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-neutral-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/checkout?slug=${primary.slug}`}
                  className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-black"
                >
                  Start this offer <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-3 text-center text-xs text-neutral-500">{primary.fulfillmentWindow}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
