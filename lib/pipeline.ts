import type { Mission, PipelineStage, VerticalId } from "./types";
import { saveMission, getMissions, getMission } from "./store";

// ─────────────────────────────────────────────────────────────────────────────
// Autonomous AI Agency Pipeline — the core architecture.
// Revenue potential is mapped onto a pipeline of stages. A mission is the
// atomic unit; the network composes the right capability cells per vertical.
// ─────────────────────────────────────────────────────────────────────────────
export const stages: PipelineStage[] = [
  "Demand",
  "Diagnosis",
  "Design",
  "Compose",
  "Execute",
  "QA",
  "Deliver",
  "Measure",
  "Brief",
];

// Capability cells mapped to pipeline stages (the "network orchestration").
export const cells: { name: string; role: string; stage: PipelineStage }[] = [
  { name: "Demand Radar", role: "Find observable pain with an economically valuable asset.", stage: "Demand" },
  { name: "Diagnostic Engine", role: "Score the pain and surface the first broken gate.", stage: "Diagnosis" },
  { name: "BizOps", role: "Decompose the mission into a bounded operating path.", stage: "Design" },
  { name: "Alexandria", role: "Retrieve reusable knowledge, templates and stock.", stage: "Compose" },
  { name: "AutonomaX", role: "Assemble mission-specific work cells and specialists.", stage: "Execute" },
  { name: "TekraQual", role: "Reject weak output before it reaches a customer.", stage: "QA" },
  { name: "Golden Delivery", role: "Package and deliver the accepted outcome.", stage: "Deliver" },
  { name: "Profit OS", role: "Surface economic truth and decide scale / repair / kill.", stage: "Measure" },
  { name: "LazyLarry", role: "Compress complexity into decisions and next actions.", stage: "Brief" },
];

export const stageDescription: Record<PipelineStage, string> = {
  Demand: "Detect observable pain where the buyer already owns a valuable asset.",
  Diagnosis: "Score the pain, name the first broken gate, and the highest-risk gate.",
  Design: "Decompose the mission into a bounded operating path with owners and acceptance.",
  Compose: "Select the right intelligence, software, stock and specialist capacity.",
  Execute: "Run the work through owners, handoffs and gates.",
  QA: "Verify the output against the contract before delivery.",
  Deliver: "Package and land the accepted outcome.",
  Measure: "Read the economic truth: scale, repair, repeat or kill.",
  Brief: "Give the executive the decisions and next actions, not the machinery.",
};

export function createMission(vertical: VerticalId, objective: string): Mission {
  const now = Date.now();
  const id = `MSN-${now.toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const gates = stages.map((stage) => ({ stage, done: stage === "Demand", evidence: stage === "Demand" ? "qualified demand" : "" }));
  const mission: Mission = {
    id,
    vertical,
    objective,
    stage: "Diagnosis",
    gates,
    cells: cells.filter((c) => c.stage !== "Demand").map((c) => ({ name: c.name, role: c.role, stage: c.stage, state: c.stage === "Diagnosis" ? "active" : "idle" as const })),
    orderId: null,
    createdAt: now,
    updatedAt: now,
  };
  return mission;
}

export async function persistMission(mission: Mission): Promise<void> {
  await saveMission(mission);
}

export function advanceMission(mission: Mission, stage: PipelineStage, evidence: string): Mission {
  const idx = stages.indexOf(stage);
  if (idx === -1) return mission;
  mission.gates = mission.gates.map((g) => (g.stage === stage ? { ...g, done: true, evidence } : g));
  mission.cells = mission.cells.map((c) => (c.stage === stage ? { ...c, state: "done" } : c));
  const next = stages[idx + 1];
  if (next) {
    mission.stage = next;
    mission.cells = mission.cells.map((c) => (c.stage === next ? { ...c, state: "active" } : c));
  }
  mission.updatedAt = Date.now();
  return mission;
}

export async function listMissions(): Promise<Mission[]> {
  return getMissions();
}

export async function findMission(id: string): Promise<Mission | undefined> {
  return getMission(id);
}

// A bounded, readable summary of where a mission sits in the pipeline.
export function missionBrief(mission: Mission): { id: string; stage: PipelineStage; progress: number; next: string; gates: number } {
  const progress = Math.round((mission.gates.filter((g) => g.done).length / stages.length) * 100);
  const next = stages[stages.indexOf(mission.stage) + 1] ?? "Complete";
  return {
    id: mission.id,
    stage: mission.stage,
    progress,
    next,
    gates: mission.gates.filter((g) => g.done).length,
  };
}
