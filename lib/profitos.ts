// ─────────────────────────────────────────────────────────────────────────────
// Profit OS — reusable "profit modules". Every plan/feature states which
// modules it invokes. This registry keeps the profit-first discipline explicit.
// ─────────────────────────────────────────────────────────────────────────────
export interface ProfitModule {
  id: string;
  name: string;
  summary: string;
  wiring: string;
}

export const profitModules: ProfitModule[] = [
  { id: "radar", name: "Profit Radar", summary: "Scan niche, audience, competitors, price bands and pains.", wiring: "lib/verticals.ts + /radar" },
  { id: "offer", name: "Offer That Prints Money", summary: "Turn an idea into a concrete, sellable offer with a value ladder.", wiring: "lib/products.ts + /offers" },
  { id: "brand", name: "Instant Brand-in-a-Box", summary: "Handle, tagline, story, palette, tone, ready messaging.", wiring: "layout.tsx + globals.css" },
  { id: "website", name: "Website That Sells While You Sleep", summary: "Funnel-aligned conversion pages with proof blocks.", wiring: "app/* + components" },
  { id: "hype", name: "7-Day Hype Machine", summary: "Pre-launch → launch → post-launch campaign schedule.", wiring: "lib/lanes.ts (campaign lane)" },
  { id: "zero-ad", name: "Zero-Ad Sales Plan", summary: "Sales routes without paid ads: network, DMs, partnerships.", wiring: "lib/lanes.ts (distribution)" },
  { id: "objection", name: "Objection Killer", summary: "Embed answers to top objections into pages and FAQs.", wiring: "components + /offers" },
  { id: "partnership", name: "Partnership Power Plays", summary: "Collaboration with creators, agencies, marketplaces.", wiring: "lib/lanes.ts (partner lane)" },
  { id: "scale", name: "60-Day Scale Sprint", summary: "Weekly milestones, KPIs and experiments.", wiring: "lib/departments.ts + /earnings" },
  { id: "automation", name: "Automation Money Machine", summary: "Turn manual steps into queue-based jobs and recurring cycles.", wiring: "lib/lanes.ts + lib/audit.ts" },
];

export function invokeProfitModules(ids: string[]): ProfitModule[] {
  return profitModules.filter((m) => ids.includes(m.id));
}

export function profitModuleIds(): string[] {
  return profitModules.map((m) => m.id);
}
