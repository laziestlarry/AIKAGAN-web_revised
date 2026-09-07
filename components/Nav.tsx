import Link from "next/link";
import { Sparkles } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/copilot", label: "Copilot" },
  { href: "/radar", label: "Radar" },
  { href: "/offers", label: "Offers" },
  { href: "/earnings", label: "Earnings" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-500 text-ink">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-lg font-black tracking-tight">
            Autonoma<span className="gold-grad">X</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-neutral-300 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/diagnose"
          className="rounded-xl bg-gold px-4 py-2 text-sm font-black text-black transition hover:brightness-110"
        >
          Start free
        </Link>
      </div>
    </header>
  );
}
