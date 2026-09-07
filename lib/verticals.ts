import type { Vertical } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// AutonomaX lanes — "boosters", not savers. Each is a partner for a buyer who
// already owns something valuable. We help it work harder.
// ─────────────────────────────────────────────────────────────────────────────
export const verticals: Vertical[] = [
  {
    id: "creator-rescue",
    title: "Creator Booster",
    tag: "Creator",
    audience: "Established YouTube / video creators",
    pain: "They have an audience but the content engine is underperforming.",
    symptom: "Flat or shrinking channel despite valuable existing equity.",
    engine: "Audience Weather → Opportunity Radar → Next Flight",
    freeTool: "Creator Boost Scan",
    paidOffer: "Creator Booster Pilot (one finished content experiment)",
    proof: "A public channel diagnosis + 3 creative routes, kept free.",
    emoji: "🎬",
    accent: "#38bdf8",
    analogy: "A co-pilot who reads the audience's weather and files your next route.",
  },
  {
    id: "store-rescue",
    title: "Store Booster",
    tag: "Store",
    audience: "Shopify / e-commerce operators",
    pain: "They get traffic but lose buyers between visit and payment.",
    symptom: "High visit volume, low conversion, abandoned carts.",
    engine: "Revenue Leak Scan → Conversion Repair Sprint",
    freeTool: "Conversion Boost Scan",
    paidOffer: "Conversion Booster Sprint",
    proof: "An offer-to-checkout teardown with ranked fixes.",
    emoji: "🛒",
    accent: "#f59e0b",
    analogy: "A shop assistant who catches buyers at the door and clears the friction.",
  },
  {
    id: "agency-rescue",
    title: "Agency Booster",
    tag: "Agency",
    audience: "Agencies & service businesses",
    pain: "They have leads but the delivery machine is manual and overloaded.",
    symptom: "Repetitive fulfillment, slow handoffs, margin squeeze.",
    engine: "AutonomaX Ops Audit → Workflow Automation",
    freeTool: "Ops Boost Scan",
    paidOffer: "Agency Automation Sprint",
    proof: "A process map with the top automation wins.",
    emoji: "🏢",
    accent: "#a78bfa",
    analogy: "An extra back office handling the thousand buttons while you lead.",
  },
  {
    id: "expert-rescue",
    title: "Expert Booster",
    tag: "Expert",
    audience: "Consultants & specialists",
    pain: "They have expertise but no productized revenue path.",
    symptom: "Selling hours, not outcomes; no scalable offer.",
    engine: "Expert Product Factory",
    freeTool: "Expert Boost Scan",
    paidOffer: "Expert Product Build",
    proof: "A draft product architecture from their existing knowledge.",
    emoji: "🎓",
    accent: "#34d399",
    analogy: "A product manager for your know-how.",
  },
  {
    id: "local-rescue",
    title: "Local Booster",
    tag: "Local",
    audience: "Local businesses",
    pain: "They have demand but weak digital conversion.",
    symptom: "Calls from word-of-mouth but a website that does not sell.",
    engine: "Local Growth Booster",
    freeTool: "Local Boost Scan",
    paidOffer: "Local Growth Sprint",
    proof: "A 1-page digital conversion upgrade plan.",
    emoji: "🏪",
    accent: "#fb7185",
    analogy: "A storefront that finally sells after closing time.",
  },
  {
    id: "saas-rescue",
    title: "SaaS Booster",
    tag: "SaaS",
    audience: "SaaS founders",
    pain: "They have users but poor activation and retention.",
    symptom: "Signups that never become retained, active customers.",
    engine: "SaaS Funnel Booster",
    freeTool: "Activation Boost Scan",
    paidOffer: "Activation Repair Sprint",
    proof: "A funnel teardown focused on activation + retention.",
    emoji: "📈",
    accent: "#818cf8",
    analogy: "An activation engineer that turns signups into kept customers.",
  },
];

export function getVertical(id: string): Vertical | undefined {
  return verticals.find((v) => v.id === id);
}

export function verticalLabel(id: string): string {
  return getVertical(id)?.title ?? "General";
}
