# AutonomaX — Your money-making copilot

An **independent, self-sufficient, free-deployable** autonomous business copilot. It finds where you lose time and
money, builds a bounded fix, runs the whole factory behind you, and reports back in plain language.

It is **not** connected to any live storefront, does not touch `laziestlarry/aikagan-web`, and has no dependency on
the existing production platform, database or payment accounts. It is the parallel, restructured build.

## The proposition

> You run the business. We run the machine.

AutonomaX is a partner and time-saver, not a rescuer. It uses plain language and analogies — a co-pilot who reads the
weather, files the route and handles the thousand buttons while you stay the captain.

## The pipeline

The value chain is a pipeline. A **mission** is the atomic unit, and revenue potential maps onto it:

```
Demand → Diagnosis → Design → Compose → Execute → QA → Deliver → Measure → Brief
```

Every stage earns the next. The pipeline is backed by **capability cells** (Demand Radar, Diagnostic Engine, BizOps,
Alexandria, AutonomaX, TekraQual, Golden Delivery, Profit OS, LazyLarry) and **configured departments**.

## Intelligence. Control. Assurance.

A **binding quality audit** runs every input, plan and output through three providers in sequence:

- **Intelligence** — assesses the input for clarity, intent and signal.
- **Control** — audits the execution plan for guardrails, scope, owner, acceptance and rollback.
- **Assurance** — verifies the output against the contract.

The combined verdict drives the gate. Runs in deterministic mode with zero credentials; adapters exist for
real LLM providers.

## Automated production lanes

Each lane is a profit-centric circular chain: Input → Transform → QA → List → Sell → Fulfill → Measure → Reinvest.
The **listing engine** turns raw inputs into a ready-to-sell package (title, description, price, tags). Lanes are
ranked by a **smart earnings score** (margin, conversion, trend, reach, penalised by refunds and age).

## Profit OS modules

Every plan invokes explicit Profit OS modules. See `lib/profitos.ts`:

1. Profit Radar · 2. Offer That Prints Money · 3. Instant Brand-in-a-Box · 4. Website That Sells While You Sleep ·
5. 7-Day Hype Machine · 6. Zero-Ad Sales Plan · 7. Objection Killer · 8. Partnership Power Plays ·
9. 60-Day Scale Sprint · 10. Automation Money Machine

## Routes

| Route | Purpose |
|---|---|
| `/` | Home — the copilot proposition + lanes |
| `/copilot` | The control room — pipeline, cells, departments, Profit OS |
| `/radar` | Opportunity radar — ranked lanes |
| `/boost/[vertical]` | Lane page (booster framing, plain language, analogies) |
| `/diagnose` | Free diagnostic — score, first broken gate, priorities, DIY |
| `/offers` | Productized offers |
| `/audit` | 3-provider quality audit (intelligence · control · assurance) |
| `/earnings` | Smart earnings scoring + ranked delivery options |
| `/intel` | Data intelligence — scrape, transcribe, extract process |
| `/checkout` + `/checkout/success` | Payment → delivery → acceptance loop |
| `/dashboard` | Live mission / pipeline console |
| `/api/*` | audit, checkout, diagnose, earnings, intake, intel, lanes, ledger, mission, orders, webhook, health |

## Local run

```bash
npm install
npm run build && npm run start   # production
# or: npm run dev
```

## Environment

Create `.env` (gitignored) by merging keys from the referenced source folders:

```bash
node scripts/build-env.mjs \
  --aikagan "/Users/pq/pq_works/AIKAGAN-web/.env.production" \
  --ops "/Users/pq/pq_works/projects/autonomax_revenue_ops/.env"
```

The script copies only keys this app consumes and **never prints values**. `PAYMENT_RAIL=demo` by default so the full
loop runs free with no credentials. Set `PAYMENT_RAIL=stripe|gumroad|paddle` + the matching env to activate a real rail.

## Rotation & upload

```bash
node scripts/rotate-and-upload.mjs            # dry run (default) — prints rotation checklist
node scripts/rotate-and-upload.mjs --vercel   # upload to Vercel env, then vercel --prod
node scripts/rotate-and-upload.mjs --netlify  # upload to Netlify env
```

Rotation is a deliberate, human-approved action. Never paste a secret into chat or a ticket.

## Free deployment

Normal Next.js app — deploys free on any standard host.

**Vercel (recommended):**
```bash
npx vercel          # create a NEW project
npx vercel --prod
```

**Netlify / Cloudflare Pages:** connect the repo, build command `npm run build`, output `.next`.

## Independence

This repo is intentionally isolated: its own store, its own payment adapter, its own deployment. It is the
self-sufficient alternative build.
