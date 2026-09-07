// ─────────────────────────────────────────────────────────────────────────────
// AIKAGAN-web_revised — shared domain types
// The value chain is expressed as a pipeline. Revenue potential maps onto it.
// ─────────────────────────────────────────────────────────────────────────────

export type VerticalId =
  | "creator-rescue"
  | "store-rescue"
  | "agency-rescue"
  | "expert-rescue"
  | "local-rescue"
  | "saas-rescue";

export interface Vertical {
  id: VerticalId;
  title: string;
  audience: string;
  pain: string;
  symptom: string;
  engine: string;
  freeTool: string;
  paidOffer: string;
  proof: string;
  emoji: string;
  accent: string;
}

export interface Offer {
  slug: string;
  name: string;
  tier: "free" | "tripwire" | "core" | "recurring";
  priceUsd: number;
  priceLabel: string;
  description: string;
  bullets: string[];
  vertical: VerticalId;
  delivery: "download" | "service" | "managed";
  fulfillmentWindow: string;
  badge: string;
}

export type DiagnosticMode = "foundation" | "improvement" | "performance";

export interface DiagnosticResult {
  score: number; // 0-100
  mode: DiagnosticMode;
  summary: string;
  firstBrokenGate: string | null;
  highestRiskGate: string | null;
  priorities: Priority[];
  matchedOfferSlug: string | null;
  diy: string[];
  hypotheses: string[];
  raw: number[];
}

export interface Priority {
  gate: string;
  title: string;
  why: string;
  diy: string;
  aikagan: string;
}

export type PipelineStage =
  | "Demand"
  | "Diagnosis"
  | "Design"
  | "Compose"
  | "Execute"
  | "QA"
  | "Deliver"
  | "Measure"
  | "Brief";

export interface Mission {
  id: string;
  vertical: VerticalId;
  objective: string;
  stage: PipelineStage;
  gates: { stage: PipelineStage; done: boolean; evidence: string }[];
  cells: { name: string; role: string; stage: PipelineStage; state: "idle" | "active" | "done" }[];
  orderId: string | null;
  createdAt: number;
  updatedAt: number;
}

export interface Order {
  id: string;
  offerSlug: string;
  amount: number;
  currency: string;
  status:
    | "intent"
    | "pending_payment"
    | "paid"
    | "fulfilled"
    | "accepted"
    | "refunded"
    | "failed";
  rail: string;
  email: string | null;
  attribution: { source: string | null; campaign: string | null };
  evidence: { paymentId: string | null; webhook: string | null; delivery: string | null; acceptance: string | null };
  createdAt: number;
}

export interface LedgerEntry {
  id: string;
  kind: "traffic" | "diagnostic" | "intent" | "paid" | "delivery" | "acceptance";
  vertical: VerticalId | null;
  source: string | null;
  campaign: string | null;
  amount: number;
  at: number;
}
