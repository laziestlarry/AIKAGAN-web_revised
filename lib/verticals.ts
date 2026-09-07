import type { Vertical } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Demand Radar — the "trendy business solution to niche pain-killer content"
// engine. Each vertical is an observable pain with an economically valuable
// asset the buyer already owns. We hunt stranded value, then sell its recovery.
// ─────────────────────────────────────────────────────────────────────────────
export const verticals: Vertical[] = [
  {
    id: "creator-rescue",
    title: "Creator Rescue",
    audience: "Established YouTube / video creators",
    pain: "They have an audience but the content engine is underperforming.",
    symptom: "Flat or shrinking channel despite valuable existing equity.",
    engine: "Audience Weather → Opportunity Radar → Next Flight",
    freeTool: "Creator Rescue Scan",
    paidOffer: "Creator Rescue Pilot (one finished content experiment)",
    proof: "A public channel diagnosis + 3 creative routes, kept free.",
    emoji: "🎬",
    accent: "#38bdf8",
  },
  {
    id: "store-rescue",
    title: "Store Rescue",
    audience: "Shopify / e-commerce operators",
    pain: "They get traffic but lose buyers between visit and payment.",
    symptom: "High visit volume, low conversion, abandoned carts.",
    engine: "Revenue Leak Scan → Conversion Repair Sprint",
    freeTool: "Conversion Leak Scan",
    paidOffer: "Conversion Repair Sprint",
    proof: "An offer-to-checkout teardown with ranked fixes.",
    emoji: "🛒",
    accent: "#f59e0b",
  },
  {
    id: "agency-rescue",
    title: "Agency Rescue",
    audience: "Agencies & service businesses",
    pain: "They have leads but the delivery machine is manual and overloaded.",
    symptom: "Repetitive fulfillment, slow handoffs, margin squeeze.",
    engine: "AutonomaX Ops Audit → Workflow Automation",
    freeTool: "Ops Bottleneck Scan",
    paidOffer: "Agency Automation Sprint",
    proof: "A process map with the top automation wins.",
    emoji: "🏢",
    accent: "#a78bfa",
  },
  {
    id: "expert-rescue",
    title: "Expert Rescue",
    audience: "Consultants & specialists",
    pain: "They have expertise but no productized revenue path.",
    symptom: "Selling hours, not outcomes; no scalable offer.",
    engine: "Expert Product Factory",
    freeTool: "Expert Product Scan",
    paidOffer: "Expert Product Build",
    proof: "A draft product architecture from their existing knowledge.",
    emoji: "🎓",
    accent: "#34d399",
  },
  {
    id: "local-rescue",
    title: "Local Rescue",
    audience: "Local businesses",
    pain: "They have demand but weak digital conversion.",
    symptom: "Calls from word-of-mouth but a website that does not sell.",
    engine: "Local Growth Rescue",
    freeTool: "Local Conversion Scan",
    paidOffer: "Local Growth Sprint",
    proof: "A 1-page digital conversion upgrade plan.",
    emoji: "🏪",
    accent: "#fb7185",
  },
  {
    id: "saas-rescue",
    title: "SaaS Rescue",
    audience: "SaaS founders",
    pain: "They have users but poor activation and retention.",
    symptom: "Signups that never become retained, active customers.",
    engine: "SaaS Funnel Rescue",
    freeTool: "Activation Leak Scan",
    paidOffer: "Activation Repair Sprint",
    proof: "A funnel teardown focused on activation + retention.",
    emoji: "📈",
    accent: "#818cf8",
  },
];

export function getVertical(id: string): Vertical | undefined {
  return verticals.find((v) => v.id === id);
}

export function verticalLabel(id: string): string {
  return getVertical(id)?.title ?? "General";
}
