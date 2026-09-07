import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-4xl font-black">Not found</h1>
      <p className="mt-4 text-neutral-400">This surface does not exist in the revised build.</p>
      <Link href="/" className="mt-6 inline-flex rounded-xl bg-gold px-6 py-3 text-sm font-black text-black">
        Back home
      </Link>
    </main>
  );
}
