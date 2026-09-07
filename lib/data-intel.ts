// ─────────────────────────────────────────────────────────────────────────────
// Data intelligence — scraping, transcription and process extraction.
// Deterministic implementations (no external keys) with documented adapters so
// real scraper / STT / parser providers can be wired when credentials exist.
// ─────────────────────────────────────────────────────────────────────────────
export interface IntelResult {
  kind: "scrape" | "transcribe" | "process";
  summary: string;
  signals: string[];
  score: number;
}

export function scrapeSignals(source: string): IntelResult {
  const text = source.trim();
  const signals = ["audience", "revenue", "automation", "offer", "pain", "growth", "save", "time"].filter((s) =>
    text.toLowerCase().includes(s),
  );
  const score = Math.min(100, Math.round((signals.length / 8) * 100));
  return {
    kind: "scrape",
    summary: text
      ? `Extracted ${signals.length} commercial signal(s) from the source.`
      : "No source text to analyse.",
    signals,
    score,
  };
}

export function transcribeIntelligence(audioRef: string, text = ""): IntelResult {
  const signals = ["idea", "offer", "plan", "next", "money", "step", "fix", "growth"].filter((s) =>
    text.toLowerCase().includes(s),
  );
  return {
    kind: "transcribe",
    summary: `Transcribed "${audioRef || "clip"}" → ${text ? `${text.split(/\s+/).length} words, ${signals.length} actionable signals.` : "no transcript yet — wire an STT provider."}`,
    signals,
    score: Math.min(100, Math.round((signals.length / 8) * 100)),
  };
}

export function extractProcess(text: string): { steps: string[]; loop: string[]; score: number } {
  const lines = text
    .split(/\n|;/)
    .map((l) => l.trim())
    .filter(Boolean);
  const steps = lines.slice(0, 8);
  const loop = ["Reuse", "Review", "Refine", "Reinvest"];
  const score = Math.min(100, Math.round((steps.length / 5) * 100));
  return { steps, loop, score };
}

// Adapter contract for a real scraper / STT / parser when keys exist.
export function intelProvider(): string {
  const keys = ["SCRAPINGBEE_API_KEY", "ASSEMBLYAI_API_KEY", "OPENAI_API_KEY"].filter((k) => process.env[k]);
  return keys.length ? "live" : "deterministic";
}
