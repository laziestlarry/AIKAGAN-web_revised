// ─────────────────────────────────────────────────────────────────────────────
// Smart earnings scoring — ranks automated delivery options by expected return.
// Composite score: margin, conversion, trend, views; penalised by refund & age.
// ─────────────────────────────────────────────────────────────────────────────
export interface DeliveryOption {
  id: string;
  name: string;
  lane: string;
  margin: number;
  conversion: number;
  trend: number;
  views: number;
  refund: number;
  stale: number;
}

export interface RankedOption extends DeliveryOption {
  score: number;
  verdict: "prime" | "viable" | "watch";
}

export function smartEarningsScore(o: DeliveryOption): number {
  const margin = Math.max(0, Math.min(100, o.margin)) * 0.4;
  const conversion = Math.max(0, Math.min(100, o.conversion)) * 0.25;
  const views = Math.min(o.views / 1000, 10);
  const trend = Math.max(-20, Math.min(20, o.trend)) * 0.15;
  const refundPen = Math.min(o.refund, 50) * 2;
  const stalePen = Math.min(o.stale / 7, 5);
  return Math.round(Math.max(0, margin + conversion + views + trend - refundPen - stalePen));
}

export function rankDeliveryOptions(options: DeliveryOption[]): RankedOption[] {
  return options
    .map((o) => {
      const score = smartEarningsScore(o);
      const verdict: "prime" | "viable" | "watch" = score >= 70 ? "prime" : score >= 45 ? "viable" : "watch";
      return { ...o, score, verdict };
    })
    .sort((a, b) => b.score - a.score);
}

export const sampleDeliveryOptions: DeliveryOption[] = [
  { id: "opt-1", name: "Creator Booster Pilot", lane: "creator-booster", margin: 78, conversion: 6, trend: 18, views: 3000, refund: 3, stale: 2 },
  { id: "opt-2", name: "Store Conversion Sprint", lane: "store-booster", margin: 72, conversion: 8, trend: 12, views: 2200, refund: 2, stale: 5 },
  { id: "opt-3", name: "Agency Automation Build", lane: "agency-booster", margin: 65, conversion: 5, trend: 15, views: 1800, refund: 4, stale: 1 },
  { id: "opt-4", name: "Expert Product Build", lane: "expert-booster", margin: 70, conversion: 4, trend: 10, views: 1200, refund: 5, stale: 8 },
  { id: "opt-5", name: "Local Growth Sprint", lane: "local-booster", margin: 55, conversion: 7, trend: 6, views: 1500, refund: 3, stale: 12 },
  { id: "opt-6", name: "SaaS Activation Sprint", lane: "saas-booster", margin: 68, conversion: 3, trend: 14, views: 2600, refund: 6, stale: 3 },
];
