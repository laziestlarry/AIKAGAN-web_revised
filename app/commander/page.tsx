import { currentUser } from "@/lib/auth";
import { CommanderDashboard } from "@/components/CommanderDashboard";

export default async function CommanderPage() {
  const user = await currentUser();
  if (!user || user.role !== "commander") {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-black">Commander access required</h1>
        <p className="mt-3 text-neutral-400">
          This area is gated to the AutonomaX Commander (admin). Sign in with a commander account to review
          strategic routing and approve direction changes.
        </p>
      </main>
    );
  }
  return <CommanderDashboard />;
}
