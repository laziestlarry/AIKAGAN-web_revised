// ─────────────────────────────────────────────────────────────────────────────
// Advanced execution departments — configured capability units with roles and
// KPIs. The logical organization behind the pipeline.
// ─────────────────────────────────────────────────────────────────────────────
export interface Department {
  id: string;
  name: string;
  analogy: string;
  kpi: string;
  members: string[];
}

export const departments: Department[] = [
  { id: "demand", name: "Demand Radar", analogy: "The weather station that sees the storm coming.", kpi: "qualified pains detected / week", members: ["Scanner", "Ranker", "Trend analyst"] },
  { id: "research", name: "Research & Intel", analogy: "The library that reads everything so you don't have to.", kpi: "signals extracted per source", members: ["Scraper", "Transcriber", "Process extractor"] },
  { id: "production", name: "Production Cell", analogy: "The assembly line that builds the cure.", kpi: "cycles completed / week", members: ["Listing engine", "Content builder", "Packager"] },
  { id: "qa", name: "Quality & Assurance", analogy: "The inspector who rejects weak output before it ships.", kpi: "acceptance rate", members: ["Intelligence", "Control", "Assurance"] },
  { id: "commerce", name: "Commerce Spine", analogy: "The cash register that never closes.", kpi: "provider-verified orders", members: ["Checkout", "Payment rail", "Entitlement"] },
  { id: "fulfillment", name: "Fulfillment & Delivery", analogy: "The dispatch desk that lands the outcome.", kpi: "accepted deliveries", members: ["Golden Delivery", "Access", "Acceptance"] },
  { id: "profitos", name: "Profit OS", analogy: "The accountant who reads the truth and tells you what to scale.", kpi: "contribution per hour", members: ["Radar", "Offer", "Scale"] },
];

export function getDepartment(id: string): Department | undefined {
  return departments.find((d) => d.id === id);
}
