import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { offers } from "@/lib/products";
import { verticalLabel } from "@/lib/verticals";

export default function OffersPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <p className="chip text-emerald-300">Offers</p>
      <h1 className="mt-5 text-4xl font-black sm:text-5xl">Productized outcomes, not feature bundles</h1>
      <p className="mt-5 max-w-3xl leading-8 text-neutral-300">
        Every offer is a bounded outcome with acceptance criteria. Paid checkout only opens when delivery is
        wired. Otherwise you request scope.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((o) => (
          <div key={o.slug} className="card flex flex-col">
            <div className="flex items-center justify-between">
              <span className="chip text-gold">{o.badge}</span>
              <span className="text-2xl font-black text-gold">{o.priceLabel}</span>
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">{verticalLabel(o.vertical)}</p>
            <h2 className="mt-3 text-xl font-bold">{o.name}</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-400">{o.description}</p>
            <ul className="mt-4 space-y-2">
              {o.bullets.slice(0, 3).map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-neutral-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> {b}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              <Link href={`/checkout?slug=${o.slug}`} className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-black">
                {o.tier === "free" ? "Get it free" : "Start this offer"} <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-center text-xs text-neutral-500">{o.fulfillmentWindow}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
