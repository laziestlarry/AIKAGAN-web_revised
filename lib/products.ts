import type { Offer } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Offer catalog — "productized service SKUs". Niche pain-killer outcomes that
// map a diagnosed problem to a bounded deliverable. Free diagnosis first.
// ─────────────────────────────────────────────────────────────────────────────
export const offers: Offer[] = [
  {
    slug: "creator-pilot",
    name: "Creator Rescue Pilot",
    tier: "tripwire",
    priceUsd: 149,
    priceLabel: "$149",
    description:
      "One finished content experiment for a channel with stranded audience equity: research, concept, hook, script, packaging direction and production assets.",
    bullets: [
      "Channel & audience evidence review",
      "One recommended next-video experiment",
      "Script + hook + storyboard",
      "3 thumbnail / title alternatives",
      "Shorts derivatives + publishing package",
      "Included for a bounded, single upload",
    ],
    vertical: "creator-rescue",
    delivery: "managed",
    fulfillmentWindow: "7-day delivery window after scope confirmation",
    badge: "Creator · Pilot",
  },
  {
    slug: "conversion-sprint",
    name: "Conversion Repair Sprint",
    tier: "core",
    priceUsd: 199,
    priceLabel: "$199",
    description:
      "A bounded intervention on the offer-to-checkout path for a store or funnel that gets traffic but loses buyers.",
    bullets: [
      "Offer & proof gap review",
      "Checkout path teardown",
      "Ranked fixes by likely impact",
      "14-day implementation sequence",
      "Implementation included for the top fix",
    ],
    vertical: "store-rescue",
    delivery: "service",
    fulfillmentWindow: "10-day delivery window after scope confirmation",
    badge: "Store · Sprint",
  },
  {
    slug: "agency-automation",
    name: "Agency Automation Sprint",
    tier: "core",
    priceUsd: 299,
    priceLabel: "$299",
    description:
      "Map the repetitive fulfillment machine and automate the highest-value workflow without locking you into another platform.",
    bullets: [
      "Process & bottleneck map",
      "Top automation wins ranked",
      "One workflow implemented end-to-end",
      "Vendor-neutral runbook",
      "QA + acceptance checklist",
    ],
    vertical: "agency-rescue",
    delivery: "managed",
    fulfillmentWindow: "14-day delivery window after scope confirmation",
    badge: "Agency · Build",
  },
  {
    slug: "expert-product",
    name: "Expert Product Build",
    tier: "core",
    priceUsd: 249,
    priceLabel: "$249",
    description:
      "Turn existing expertise into a sellable offer: product architecture, offer, pricing and delivery path.",
    bullets: [
      "Product architecture from your knowledge",
      "Offer + price + delivery design",
      "Sample deliverable",
      "Launch sequence",
    ],
    vertical: "expert-rescue",
    delivery: "service",
    fulfillmentWindow: "10-day delivery window after scope confirmation",
    badge: "Expert · Productize",
  },
  {
    slug: "local-growth",
    name: "Local Growth Sprint",
    tier: "core",
    priceUsd: 149,
    priceLabel: "$149",
    description:
      "A 1-page digital conversion upgrade for a local business that already has demand but a website that does not sell.",
    bullets: [
      "Local conversion review",
      "1-page improvement plan",
      "Priority fixes ranked",
      "Recommended next action",
    ],
    vertical: "local-rescue",
    delivery: "service",
    fulfillmentWindow: "7-day delivery window after scope confirmation",
    badge: "Local · Quick",
  },
  {
    slug: "activation-sprint",
    name: "Activation Repair Sprint",
    tier: "core",
    priceUsd: 299,
    priceLabel: "$299",
    description:
      "A funnel teardown focused on activation and retention for a product with users that do not convert into retained customers.",
    bullets: [
      "Activation & retention teardown",
      "Funnel leak diagnosis",
      "Ranked fixes",
      "Experiment plan",
    ],
    vertical: "saas-rescue",
    delivery: "service",
    fulfillmentWindow: "12-day delivery window after scope confirmation",
    badge: "SaaS · Sprint",
  },
  {
    slug: "genesis-mission",
    name: "Genesis Managed Mission",
    tier: "recurring",
    priceUsd: 499,
    priceLabel: "From $499",
    description:
      "A bounded managed mission through the full value cycle: diagnose, contract, compose, execute, verify, learn — with an executive brief at each gate.",
    bullets: [
      "Bounded Mission Contract",
      "Composed capability network",
      "Gate-gated delivery",
      "Profit OS economic truth",
      "LazyLarry executive briefing",
    ],
    vertical: "creator-rescue",
    delivery: "managed",
    fulfillmentWindow: "Scoped after intake",
    badge: "Genesis · Managed",
  },
];

export function getOffer(slug: string): Offer | undefined {
  return offers.find((o) => o.slug === slug);
}

export function offersByVertical(id: string): Offer[] {
  return offers.filter((o) => o.vertical === id);
}

export function getPaidOffers(): Offer[] {
  return offers.filter((o) => o.tier !== "free");
}

export function priceCents(p: Offer): number {
  return Math.round(p.priceUsd * 100);
}
