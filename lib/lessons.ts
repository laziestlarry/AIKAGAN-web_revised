// ─────────────────────────────────────────────────────────────────────────────
// Lessons learned — institutional memory for reuse, change management and
// business growth mastery. Each lesson has a rule and a reusable application.
// ─────────────────────────────────────────────────────────────────────────────
export interface Lesson {
  id: string;
  title: string;
  rule: string;
  apply: string;
}

export const lessons: Lesson[] = [
  {
    id: "l-1",
    title: "Build the sales office with the building",
    rule: "Construction and commercialization are one project schedule, not two phases.",
    apply: "Every feature must answer which value-cycle gate it advances.",
  },
  {
    id: "l-2",
    title: "Traffic is not demand",
    rule: "Pageviews measure attention, not intent. Diagnose intent before scaling traffic.",
    apply: "Track diagnostics → requests → orders, not raw visits.",
  },
  {
    id: "l-3",
    title: "Infrastructure does not anticipate revenue",
    rule: "Revenue justifies infrastructure; never the reverse.",
    apply: "Default incremental budget is $0 until a named bottleneck exists.",
  },
  {
    id: "l-4",
    title: "Activity is not business progress",
    rule: "A deployed build, a 200 response or a seeded record is not a sale.",
    apply: "Only provider-verified payment + accepted delivery counts.",
  },
  {
    id: "l-5",
    title: "Give the method, sell the execution",
    rule: "The method is not the scarce product. The diagnosis depth and the work are.",
    apply: "Free diagnosis exposes the problem; paid work solves it.",
  },
  {
    id: "l-6",
    title: "Change management beats feature churn",
    rule: "Repeatedly stopping at 60% costs more than shipping 100% once.",
    apply: "Freeze speculative builds; ship one complete loop.",
  },
];

export function applyLessons(ids: string[]): Lesson[] {
  return lessons.filter((l) => ids.includes(l.id));
}
