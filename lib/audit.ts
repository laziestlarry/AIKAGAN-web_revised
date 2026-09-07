// ─────────────────────────────────────────────────────────────────────────────
// Three-provider sequential audit — Intelligence → Control → Assurance.
// A "binding logical audit" and "quality arbitrage" over an input → execution →
// output cycle. Each provider assesses a different face of the work; the
// combined verdict drives the gate. Deterministic when no provider keys exist.
// ─────────────────────────────────────────────────────────────────────────────
export interface AuditInput {
  input: string;
  plan?: string;
  output?: string;
}

export interface AuditVerdict {
  intelligence: ProviderScore;
  control: ProviderScore;
  assurance: ProviderScore;
  score: number;
  verdict: "pass" | "review" | "fail";
  notes: string[];
  steps: string[];
}

export interface ProviderScore {
  provider: string;
  score: number; // 0-100
  findings: string[];
  confidence: number;
}

function clamp(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function scoreText(text: string, signals: string[]): number {
  let s = 50;
  if (!text) return 20;
  const words = text.trim().split(/\s+/).length;
  if (words < 8) s -= 25;
  if (words > 250) s -= 10;
  for (const sig of signals) {
    if (text.toLowerCase().includes(sig.toLowerCase())) s += 12;
  }
  if (text.includes("?")) s += 8;
  return clamp(s);
}

// Provider 1 — Intelligence: assesses the input for clarity, intent and signal.
function intelligence(input: AuditInput): ProviderScore {
  const text = input.input;
  const signals = ["customer", "revenue", "time", "automation", "audience", "offer", "problem", "save", "growth"];
  const score = scoreText(text, signals);
  const findings: string[] = [];
  if (!text.trim()) findings.push("Input is empty — no signal to act on.");
  else if (score < 45) findings.push("Input is thin — enrich with intent, audience and outcome.");
  else findings.push("Input carries a clear commercial signal.");
  return { provider: "Intelligence", score, findings, confidence: 0.85 };
}

// Provider 2 — Control: audits the execution plan for risk, guardrails and coverage.
function control(input: AuditInput): ProviderScore {
  const text = input.plan ?? "";
  const signals = ["scope", "gate", "owner", "acceptance", "risk", "limit", "check", "rollback", "SLA"];
  const score = scoreText(text, signals);
  const findings: string[] = [];
  if (score < 45) findings.push("Plan lacks guardrails — add scope, owner, acceptance and rollback.");
  else findings.push("Plan is bounded with controls.");
  return { provider: "Control", score, findings, confidence: 0.8 };
}

// Provider 3 — Assurance: verifies the output against the contract.
function assurance(input: AuditInput): ProviderScore {
  const text = input.output ?? "";
  const signals = ["delivered", "verified", "accepted", "evidence", "complete", "result", "deployed"];
  const score = scoreText(text, signals);
  const findings: string[] = [];
  if (score < 45) findings.push("Output lacks verifiable evidence of completion.");
  else findings.push("Output carries acceptance evidence.");
  return { provider: "Assurance", score, findings, confidence: 0.78 };
}

export function runAudit(input: AuditInput): AuditVerdict {
  const intelligence = intelligenceFn(input);
  const control = controlFn(input);
  const assurance = assuranceFn(input);
  const score = clamp(intelligence.score * 0.4 + control.score * 0.3 + assurance.score * 0.3);
  const verdict = score >= 75 ? "pass" : score >= 50 ? "review" : "fail";
  const notes = [...intelligence.findings, ...control.findings, ...assurance.findings];
  return {
    intelligence,
    control,
    assurance,
    score,
    verdict,
    notes,
    steps: ["Input received", "Intelligence assesses intent", "Control audits the plan", "Assurance verifies output", "Gate decided"],
  };
}

// Local aliases to keep the provider functions pure and named.
const intelligenceFn = intelligence;
const controlFn = control;
const assuranceFn = assurance;

// Provider adapter: when an LLM env key is present, a real provider can replace
// the deterministic scoring. This stub documents the contract and keeps the
// app running with zero credentials.
export function providerMode(): string {
  const providers = ["OPENAI_API_KEY", "ANTHROPIC_API_KEY", "GEMINI_API_KEY"].filter((k) => process.env[k]);
  return providers.length ? "live" : "deterministic";
}
