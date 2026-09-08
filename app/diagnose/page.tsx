import { PersonaFlow } from "@/components/PersonaFlow";

export default async function DiagnosePage({ searchParams }: { searchParams: Promise<{ vertical?: string }> }) {
  const { vertical } = await searchParams;
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <p className="chip text-emerald-300">Free profile</p>
      <h1 className="mt-5 text-4xl font-black sm:text-5xl">Show us your situation. We'll show you what we'd do.</h1>
      <p className="mt-5 max-w-3xl leading-8 text-neutral-300">
        Answer a few short questions about your lane and get a tailored read on where you stand, what's costing you,
        and the highest-leverage moves — free, and you keep it.
      </p>
      <div className="mt-12">
        <PersonaFlow initialVertical={vertical} />
      </div>
    </main>
  );
}
