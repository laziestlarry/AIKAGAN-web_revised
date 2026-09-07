// ─────────────────────────────────────────────────────────────────────────────
// Automated continuous production lanes — profit-centric circular chains.
// A lane is a reusable production line: Input → Transform → QA → List → Sell →
// Fulfill → Measure → Reinvest. Each lane has a listing engine and a cycle.
// ─────────────────────────────────────────────────────────────────────────────
export interface Lane {
  id: string;
  name: string;
  analogy: string;
  cycle: string[];
  listing: ListingStep[];
  auto: boolean;
  emoji: string;
}

export interface ListingStep {
  key: string;
  label: string;
  fn: (v: Record<string, string>) => string;
}

// Listing engine: turns raw inputs into a ready-to-sell package.
export const listingSteps: ListingStep[] = [
  { key: "title", label: "Title", fn: (v) => `${v.angle ?? "Modern"} ${v.subject ?? "Solution"} — ${v.audience ?? "For you"}` },
  { key: "desc", label: "Description", fn: (v) => `A ${v.angle ?? "practical"} ${v.subject ?? "tool"} that saves ${v.saving ?? "hours"} and turns ${v.input ?? "effort"} into a repeatable result. Built for ${v.audience ?? "busy operators"}.` },
  { key: "price", label: "Price", fn: (v) => `$${v.price ?? "49"}` },
  { key: "tags", label: "Tags", fn: () => "automation, productivity, money-maker, profit, booster" },
];

export const lanes: Lane[] = [
  {
    id: "creator-booster",
    name: "Creator Booster",
    analogy: "A pilot's co-pilot that reads the weather and files the route.",
    cycle: ["Scout audience", "Diagnose", "Build one experiment", "QA", "Ship", "Measure", "Reinvest"],
    listing: listingSteps,
    auto: true,
    emoji: "🎬",
  },
  {
    id: "store-booster",
    name: "Store Booster",
    analogy: "A shop assistant who catches buyers at the door and removes friction.",
    cycle: ["Catch traffic", "Teardown", "Fix offer", "Wire checkout", "Ship", "Measure", "Reinvest"],
    listing: listingSteps,
    auto: true,
    emoji: "🛒",
  },
  {
    id: "agency-booster",
    name: "Agency Booster",
    analogy: "An extra back office that handles the thousand buttons while you lead.",
    cycle: ["Map process", "Find bottleneck", "Automate", "QA", "Handoff", "Measure", "Reinvest"],
    listing: listingSteps,
    auto: true,
    emoji: "🏢",
  },
  {
    id: "expert-booster",
    name: "Expert Booster",
    analogy: "A product manager for your know-how.",
    cycle: ["Inventory expertise", "Productize", "Set price", "Package", "Ship", "Measure", "Reinvest"],
    listing: listingSteps,
    auto: true,
    emoji: "🎓",
  },
  {
    id: "local-booster",
    name: "Local Booster",
    analogy: "A storefront that finally starts selling after closing time.",
    cycle: ["Find demand", "Fix conversion", "Wire booking", "Ship", "Measure", "Reinvest"],
    listing: listingSteps,
    auto: true,
    emoji: "🏪",
  },
  {
    id: "saas-booster",
    name: "SaaS Booster",
    analogy: "An activation engineer that turns signups into retained users.",
    cycle: ["Teardown activation", "Fix funnel", "Wire retention", "Ship", "Measure", "Reinvest"],
    listing: listingSteps,
    auto: true,
    emoji: "📈",
  },
];

export function getLane(id: string): Lane | undefined {
  return lanes.find((l) => l.id === id);
}

export function runListingEngine(laneId: string, vars: Record<string, string>): Record<string, string> {
  const lane = getLane(laneId) ?? lanes[0];
  const out: Record<string, string> = {};
  for (const step of lane.listing) out[step.key] = step.fn(vars);
  return out;
}
