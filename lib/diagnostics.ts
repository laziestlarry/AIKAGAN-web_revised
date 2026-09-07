import type { DiagnosticMode, DiagnosticResult, Priority } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Diagnostic engine — 7 gates, A/B/C answers, rule-based diagnosis.
// OFFER (Q1-Q2) · COMMERCE (Q3-Q4) · GROWTH (Q5-Q7)
// ─────────────────────────────────────────────────────────────────────────────
export interface DiagnosticQuestion {
  gate: string;
  axis: "offer" | "commerce" | "growth";
  q: string;
  hint: string;
}

export const diagnosticQuestions: DiagnosticQuestion[] = [
  { gate: "Clarity", axis: "offer", q: "Can a new visitor understand your offer and outcome in under 30 seconds?", hint: "Audience, problem, promised result and the next action are obvious." },
  { gate: "Evidence", axis: "offer", q: "Do you show credible proof, examples, or a working demo before asking for payment?", hint: "Sample delivery, case, demonstration or trusted reference." },
  { gate: "Checkout", axis: "commerce", q: "Can a buyer reach a working checkout in two clicks or fewer?", hint: "Offer → buy path has no dead ends or friction." },
  { gate: "Fulfillment", axis: "commerce", q: "Does a verified payment automatically activate delivery or access?", hint: "Payment reliably produces the promised result." },
  { gate: "Continuation", axis: "growth", q: "Do interested visitors have a useful next step if they are not ready to buy today?", hint: "Free tool, saved result, consultation or follow-up path." },
  { gate: "Attribution", axis: "growth", q: "Can you attribute a verified purchase to the channel or campaign that created it?", hint: "You can distinguish productive acquisition from noise." },
  { gate: "Compounding", axis: "growth", q: "After delivery, is there a clear reason for the customer to return, expand, or refer someone?", hint: "Retention, expansion, complementary offer or advocacy." },
];

// answers: 0 = No/unknown, 1 = Partly, 2 = Yes reliably
export function scoreDiagnostic(answers: number[]): DiagnosticResult {
  const max = diagnosticQuestions.length * 2;
  const earned = answers.reduce((a, b) => a + b, 0);
  const score = Math.round((earned / max) * 100);

  const q = diagnosticQuestions;
  const gateState = q.map((_, i) => (answers[i] ?? 0) as 0 | 1 | 2);

  // First broken gate = earliest gate with a non-2 answer
  const firstBroken = gateState.findIndex((v) => v < 2);
  const firstBrokenGate = firstBroken === -1 ? null : q[firstBroken].gate;

  // Highest economic risk: fulfillment is the strongest warning if weak.
  const fulfillmentIdx = gateState.findIndex((_, i) => q[i].gate === "Fulfillment");
  const highestRiskGate =
    fulfillmentIdx !== -1 && gateState[fulfillmentIdx] === 0
      ? "Fulfillment"
      : gateState.findIndex((v) => v === 0) === -1
        ? null
        : q[gateState.findIndex((v) => v === 0)].gate;

  const axisAvg = (axis: "offer" | "commerce" | "growth") => {
    const idxs = q.map((_, i) => i).filter((i) => q[i].axis === axis);
    const sum = idxs.reduce((a, i) => a + gateState[i], 0);
    return sum / (idxs.length * 2);
  };

  const offerAvg = axisAvg("offer");
  const commerceAvg = axisAvg("commerce");
  const growthAvg = axisAvg("growth");

  const weakestAxis =
    offerAvg <= commerceAvg && offerAvg <= growthAvg ? "offer" : commerceAvg <= growthAvg ? "commerce" : "growth";

  const mode: DiagnosticMode = score === 100 ? "performance" : score <= 14 ? "foundation" : "improvement";

  const summary = buildSummary(score, mode, weakestAxis, firstBrokenGate);

  const priorities: Priority[] = buildPriorities(score, mode, gateState, weakestAxis);

  const diy = priorities.map((p) => p.diy);
  const hypotheses = buildHypotheses(gateState, weakestAxis);

  return {
    score,
    mode,
    summary,
    firstBrokenGate,
    highestRiskGate,
    priorities,
    matchedOfferSlug: matchOffer(mode, weakestAxis, gateState),
    diy,
    hypotheses,
    raw: answers,
  };
}

function buildSummary(score: number, mode: DiagnosticMode, axis: "offer" | "commerce" | "growth", firstBroken: string | null): string {
  if (mode === "performance") {
    return "Your foundation appears strong. The next opportunity is not another basic checkout or CTA — it is learning which combinations of market, offer, customer and channel produce the highest economic return.";
  }
  if (mode === "foundation") {
    return "You are starting from a clean sheet. Rather than optimizing individual stages, design one small complete sales cycle first: offer → proof → CTA → payment → delivery → measurement → next offer.";
  }
  const axisLabel = axis === "offer" ? "offer & evidence" : axis === "commerce" ? "commerce completion" : "growth intelligence";
  const broken = firstBroken ? `The earliest weak gate is ${firstBroken}.` : "";
  return `Your answers indicate the core digital chain is not yet consistently connected. The immediate weakness is ${axisLabel}. ${broken} Fix the weakest link before scaling traffic, not after.`;
}

function buildPriorities(score: number, mode: DiagnosticMode, gateState: (0 | 1 | 2)[], axis: "offer" | "commerce" | "growth"): Priority[] {
  const q = diagnosticQuestions;
  if (mode === "foundation") {
    return [
      {
        gate: "First Revenue Loop",
        title: "Build one small complete sales cycle",
        why: "You do not need seven systems. You need one sellable offer for one customer type with one complete transaction path, proven once.",
        diy: "Write one sentence describing who you help and the result they get. Create one free proof. Add one CTA. Run one conversation that asks for the sale.",
        aikagan: "A bounded 'First Revenue Loop' build: offer, proof, checkout, delivery and measurement for a single customer type.",
      },
      {
        gate: "Offer & Proof",
        title: "Make the offer instantly understandable",
        why: "Traffic cannot compensate for an offer people do not quickly understand or trust.",
        diy: "Show your homepage to someone unfamiliar with it. After 30 seconds ask: what is offered, for whom, what result, what next action, what evidence?",
        aikagan: "Offer clarity and proof composition for the new digital experience.",
      },
    ];
  }
  if (mode === "performance") {
    return [
      {
        gate: "Experimentation",
        title: "Optimize the system, not the basics",
        why: "The base loop already works. Value now comes from learning which experiments compound the highest return.",
        diy: "Run one controlled test per week: a new offer, channel, price, or follow-up. Record expected vs actual.",
        aikagan: "Profit OS + AutonomaX experimentation: attribution, offer portfolio, retention and continuous improvement.",
      },
      {
        gate: "Compounding",
        title: "Turn customers into a learning loop",
        why: "Acquisition is expensive; retention and referral compound it.",
        diy: "Add one post-purchase next step and one reason to return.",
        aikagan: "Retention, expansion and referral mechanics wired into the delivery path.",
      },
    ];
  }
  // improvement mode — rank by axis and weak gates
  const weak = gateState.map((v, i) => ({ v, i, gate: q[i].gate, axis: q[i].axis })).filter((x) => x.v < 2);
  const ranked = weak.sort((a, b) => a.v - b.v || (a.axis === axis ? -1 : 1) - (b.axis === axis ? -1 : 1));
  const top = ranked.slice(0, 3);

  const base: Record<string, { title: string; why: string; diy: string; aikagan: string }> = {
    Clarity: {
      title: "Make the offer instantly clear",
      why: "A visitor must understand the offer and outcome before any purchase.",
      diy: "Test your homepage on an unfamiliar person; fix what they cannot answer in 30 seconds.",
      aikagan: "Offer analysis, customer-path review and implementation of the improved experience.",
    },
    Evidence: {
      title: "Show proof before asking for payment",
      why: "Decision confidence requires demonstration, not adjectives.",
      diy: "Add one real sample delivery, case or working demo near the buy action.",
      aikagan: "Proof / sample composition and demonstration artifacts.",
    },
    Checkout: {
      title: "Shorten the path to a working checkout",
      why: "Qualified intent is lost at the last step if checkout is hard.",
      diy: "In a private window, act like a buyer: count clicks and fields between offer and payment.",
      aikagan: "Checkout path repair and friction removal.",
    },
    Fulfillment: {
      title: "Connect payment to reliable delivery",
      why: "A sale without delivery is an operational and reputation risk.",
      diy: "Verify every step from payment to access and document it.",
      aikagan: "Automated fulfillment and verification wiring.",
    },
    Continuation: {
      title: "Give non-buyers a useful next step",
      why: "Undecided demand should not disappear.",
      diy: "Add a free tool, saved result or consultation path for people not ready to buy.",
      aikagan: "Customer journey and continuation design.",
    },
    Attribution: {
      title: "Attribute purchases to their source",
      why: "Without it you cannot tell productive acquisition from noise.",
      diy: "For your last ten customers, record where each came from.",
      aikagan: "Attribution, analytics and BI wiring.",
    },
    Compounding: {
      title: "Create a reason to return or refer",
      why: "Repeat and referral are the cheapest growth.",
      diy: "Add one post-purchase next step and one referral reason.",
      aikagan: "Product ladder, retention and growth design.",
    },
  };

  const out: Priority[] = [];
  for (const x of top) {
    const b = base[x.gate] ?? base.Checkout;
    out.push({ gate: x.gate, title: b.title, why: b.why, diy: b.diy, aikagan: b.aikagan });
  }
  if (out.length === 0) {
    out.push({ gate: "Checkout", ...base.Checkout });
  }
  return out;
}

function buildHypotheses(gateState: (0 | 1 | 2)[], axis: "offer" | "commerce" | "growth"): string[] {
  const h: string[] = [];
  if (axis === "offer") h.push("Try a sharper, narrower offer — less breadth, clearer result.");
  if (axis === "commerce") h.push("Test a single low-friction offer end-to-end before adding more.");
  if (axis === "growth") h.push("Give every buyer a shareable result that exposes the offer to a next buyer.");
  h.push("Experiment with one new channel against a matched proof artifact.");
  return h;
}

export function matchOffer(mode: DiagnosticMode, axis: "offer" | "commerce" | "growth", gateState: (0 | 1 | 2)[]): string {
  if (mode === "performance") return "genesis-mission";
  if (mode === "foundation") return "conversion-sprint";
  if (axis === "offer") return "expert-product";
  if (axis === "commerce") return "conversion-sprint";
  return "agency-automation";
}
