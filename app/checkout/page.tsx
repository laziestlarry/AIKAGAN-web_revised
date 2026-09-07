"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CreditCard, Loader2, Lock, ShieldCheck } from "lucide-react";
import { getOffer } from "@/lib/products";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-6 py-24 text-center text-neutral-400">Loading checkout…</div>}>
      <CheckoutInner />
    </Suspense>
  );
}

function CheckoutInner() {
  const params = useSearchParams();
  const router = useRouter();
  const slug = params.get("slug");
  const demoOrder = params.get("demo");
  const amount = params.get("amount");
  const offer = slug ? getOffer(slug) : null;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<string | null>(null);

  useEffect(() => {
    setSource(params.get("source") ?? params.get("utm_source"));
    setCampaign(params.get("campaign") ?? params.get("utm_campaign"));
  }, [params]);

  async function startCheckout() {
    if (!offer) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: offer.slug, email: email || null, source, campaign }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "failed");
      window.location.href = data.url;
    } catch (e) {
      setError((e as Error).message ?? "Checkout failed");
      setLoading(false);
    }
  }

  async function paySimulated() {
    if (!demoOrder) return;
    setLoading(true);
    try {
      await fetch("/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "paid", orderId: demoOrder, reference: "demo" }),
      });
      router.push(`/checkout/success?order=${demoOrder}`);
    } catch {
      setError("Simulated payment failed");
      setLoading(false);
    }
  }

  // Simulated provider screen (demo mode)
  if (demoOrder) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20">
        <div className="card border-gold/30">
          <div className="flex items-center justify-between">
            <p className="chip text-gold">Demo payment · sandbox</p>
            <span className="text-2xl font-black text-gold">{amount ? `$${(Number(amount) / 100).toFixed(0)}` : ""}</span>
          </div>
          <h1 className="mt-4 text-2xl font-black">Simulated secure checkout</h1>
          <p className="mt-2 text-sm text-neutral-400">
            This is an independent build running in <span className="font-bold text-amber-300">demo rail</span> mode. No
            real charge is made. A real provider (Stripe / Gumroad / Paddle) activates automatically when keys are set.
          </p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="flex items-center gap-2 text-sm text-neutral-300"><Lock className="h-4 w-4 text-emerald-300" /> Test card · 4242 4242 4242 4242</p>
            <p className="mt-2 text-sm text-neutral-300">Order ref: <span className="font-mono">{demoOrder}</span></p>
          </div>
          <button onClick={paySimulated} disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-6 py-4 text-sm font-black text-black">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />} Pay (simulated)
          </button>
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-500"><ShieldCheck className="h-4 w-4" /> No card stored. Demo rail only.</p>
        </div>
      </main>
    );
  }

  if (!offer) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-black">Offer not found</h1>
        <p className="mt-3 text-neutral-400">Pick an offer from the catalog.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <div className="card">
        <div className="flex items-center justify-between">
          <span className="chip text-gold">{offer.badge}</span>
          <span className="text-2xl font-black text-gold">{offer.priceLabel}</span>
        </div>
        <h1 className="mt-4 text-2xl font-black">{offer.name}</h1>
        <p className="mt-2 text-sm leading-6 text-neutral-400">{offer.description}</p>

        <div className="mt-6">
          <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email (optional)</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@company.com"
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm outline-none focus:border-gold/50"
          />
        </div>

        <button onClick={startCheckout} disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-6 py-4 text-sm font-black text-black">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />} Continue to checkout
        </button>
        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        <p className="mt-4 text-center text-xs text-neutral-500">{offer.fulfillmentWindow}</p>
      </div>
    </main>
  );
}
