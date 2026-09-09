"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut, ShieldCheck, Sparkles, User } from "lucide-react";
import { useAuth } from "./AuthProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/diagnose", label: "Profile" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/offers", label: "Offers" },
  { href: "/copilot", label: "How it works" },
];

export function Nav() {
  const { user, loading, logout } = useAuth();
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky to-steel text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-lg font-black tracking-tight">
            Autonoma<span className="steel-grad">X</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-neutral-300 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {!loading && user && (
            <>
              <Link
                href="/dashboard"
                className="hidden items-center gap-2 text-sm font-semibold text-neutral-300 hover:text-white md:flex"
              >
                <LayoutDashboard className="h-4 w-4" /> My Business
              </Link>
              {user.role === "commander" && (
                <Link
                  href="/commander"
                  className="hidden items-center gap-2 text-sm font-semibold text-neutral-300 hover:text-white md:flex"
                >
                  <ShieldCheck className="h-4 w-4" /> Commander
                </Link>
              )}
              <span className="hidden items-center gap-2 rounded-xl border border-white/10 px-3 py-1.5 text-sm font-semibold md:flex">
                <User className="h-4 w-4 text-sky" /> {user.name.split(" ")[0]}
              </span>
              <button
                onClick={() => logout()}
                className="hidden items-center gap-2 rounded-xl border border-white/10 px-3 py-1.5 text-sm font-semibold text-neutral-400 hover:text-white md:flex"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </>
          )}
          {!loading && !user && (
            <Link
              href="/login"
              className="rounded-xl bg-steel px-4 py-2 text-sm font-black text-white transition hover:brightness-110"
            >
              Sign in
            </Link>
          )}
          {loading && <span className="text-sm text-neutral-500">···</span>}
        </div>
      </div>
    </header>
  );
}
