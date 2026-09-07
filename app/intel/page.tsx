"use client";

import { useState } from "react";
import { Loader2, ScanText } from "lucide-react";

export default function IntelPage() {
  const [kind, setKind] = useState<"scrape" | "transcribe" | "process">("scrape");
  const [source, setSource] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    const res = await fetch("/api/intel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, source, text }),
    });
    setResult(await res.json());
    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <p className="chip text-emerald-300">Data intelligence</p>
      <h1 className="mt-5 text-4xl font-black sm:text-5xl">Turn raw input into signals.</h1>
      <p className="mt-5 max-w-3xl leading-8 text-neutral-300">
        Scrape, transcribe and extract processes from the world around you. Every result yields commercial signals you
        can feed into a production lane.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        {(["scrape", "transcribe", "process"] as const).map((k) => (
          <button key={k} onClick={() => setKind(k)} className={`chip transition ${kind === k ? "border-emerald-400/50 text-emerald-300" : "text-neutral-400"}`}>
            {k}
          </button>
        ))}
      </div>

      <div className="mt-6 card">
        <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">{kind === "transcribe" ? "Transcript text (or paste a clip)" : "Source text / process"}</label>
        <textarea
          value={kind === "transcribe" ? text : source}
          onChange={(e) => (kind === "transcribe" ? setText(e.target.value) : setSource(e.target.value))}
          rows={6}
          placeholder={kind === "transcribe" ? "Paste transcript text…" : "Paste a webpage snippet, notes or a process description…"}
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm outline-none focus:border-emerald-300/50"
        />
        <button onClick={run} disabled={loading} className="mt-4 flex items-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-black text-black">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanText className="h-4 w-4" />} Extract
        </button>
      </div>

      {result && (
        <div className="mt-6 card">
          <p className="text-sm font-bold">Result</p>
          <pre className="mt-3 max-h-96 overflow-auto rounded-xl border border-white/10 bg-black/30 p-4 text-xs text-neutral-300">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
