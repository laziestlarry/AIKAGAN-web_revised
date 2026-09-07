import { DiagnosticFlow } from "@/components/DiagnosticFlow";

export default function DiagnosePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <p className="chip text-emerald-300">Free diagnosis</p>
      <h1 className="mt-5 text-4xl font-black sm:text-5xl">Map your pain. Keep the diagnosis.</h1>
      <p className="mt-5 max-w-3xl leading-8 text-neutral-300">
        Seven short questions. In under two minutes you get a score, the first broken gate, the highest-risk gate and
        ranked priorities with DIY actions. We give away the method — the paid value is doing the work.
      </p>
      <div className="mt-12">
        <DiagnosticFlow />
      </div>
    </main>
  );
}
