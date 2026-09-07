# AIKAGAN-web_revised

An **independent, self-sufficient, free-deployable** parallel rebuild of the AIKAGAN value chain. It is **not**
connected to the live `aikagan.com` storefront, does not touch `laziestlarry/aikagan-web`, and has no dependency on
the existing production platform, database or payment accounts.

It maps revenue potential into an **autonomous AI agency pipeline architecture** and turns it into a working web-app:
a demand radar of niche pain-killer verticals, free diagnostics, bounded productized offers, a wired
provider-agnostic payment rail, and a visible mission pipeline with evidence at every gate.

---

## What it is

The value chain is a pipeline:

```
Demand → Diagnosis → Design → Compose → Execute → QA → Deliver → Measure → Brief
```

Revenue potential is mapped onto that pipeline. A **mission** is the atomic unit. For each vertical (Creator Rescue,
Store Rescue, Agency Rescue, Expert Rescue, Local Rescue, SaaS Rescue) the app:

1. **Diagnoses** an observable pain free (7-gate scan → score + first broken gate + highest-risk gate + ranked priorities).
2. **Bounds** a commercial offer (productized outcome with acceptance criteria).
3. **Rails** a provider-agnostic checkout (demo sandbox by default; Stripe/Gumroad/Paddle activate when keys are set).
4. **Fulfills** via webhook → paid → delivery → acceptance.
5. **Exposes** the mission through the pipeline with gates and capability cells (BizOps, Alexandria, AutonomaX,
   TekraQual, Golden Delivery, Profit OS, LazyLarry).

## Architecture

- **Stack:** Next.js 15 (App Router) + TypeScript + Tailwind. Single repo, no external infra required.
- **Persistence:** `lib/store.ts` — an in-memory store by default (zero credentials, fully demonstrable), which
  upgrades to **Upstash KV** automatically if `KV_REST_API_URL` / `KV_REST_API_TOKEN` are set.
- **Payments:** `lib/payments.ts` — a provider-agnostic adapter. `PAYMENT_RAIL=demo` (default) gives a sandbox
  checkout so the whole loop works free with no keys. Set `PAYMENT_RAIL=stripe|gumroad|paddle` + the matching env
  to activate a real rail.
- **Diagnostics:** `lib/diagnostics.ts` — OFFER / COMMERCE / GROWTH axes, foundation / improvement / performance
  modes, first-broken-gate and highest-risk-gate logic, DIY + "AIKAGAN can do it" guidance, ideation.
- **Pipeline:** `lib/pipeline.ts` — stages, capability network, mission factory, gate advancement.

## Routes

| Route | Purpose |
|---|---|
| `/` | Home — value proposition + demand radar |
| `/radar` | Demand radar — ranked verticals by pain × equity × niche × repeatability |
| `/rescue/[vertical]` | Vertical pain-killer page (free tool, proof, offer) |
| `/diagnose` | Free 7-gate diagnostic with personalized result |
| `/genesis` | The pipeline architecture + interactive mission intake |
| `/offers` | Productized offers catalog |
| `/checkout` | Offer checkout + demo provider screen |
| `/checkout/success` | Delivery → acceptance flow |
| `/dashboard` | Live mission / pipeline console |
| `/api/*` | diagnose, checkout, webhook, orders, intake, mission, ledger, health |

## Local run

```bash
npm install
npm run dev       # http://localhost:3000
# or production build:
npm run build && npm run start
```

## Free deployment

It is a normal Next.js app, so it deploys free on any standard host. No platform-specific config is required.

**Recommended — Vercel (free):**

```bash
npx vercel
# create a NEW project (not the existing aikagan-web project)
npx vercel --prod
```

**Alternative — Netlify / Cloudflare Pages:** connect the repo and use the default Next.js build command
(`npm run build`) and output directory (`.next`). No credentials are required to run the funnel; the demo rail
works out of the box.

## Payment rails

| Rail | Env | Behavior |
|---|---|---|
| `demo` (default) | none | Sandbox checkout — full loop, no real charge, clearly labelled |
| `stripe` | `STRIPE_SECRET_KEY` | Stripe Checkout Session |
| `gumroad` | `GUMROAD_PRODUCT_URL` | Hosted product link |
| `paddle` | `PADDLE_API_KEY` | Paddle redirect |

See `.env.example` for the full schema.

## Independence

This repo is intentionally isolated: it does not read or write the live `aikagan.com` data, uses its own store, its
own payment adapter, and its own deployment. It is the parallel, self-sufficient alternative build requested.
