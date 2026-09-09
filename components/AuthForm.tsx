"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useAuth } from "./AuthProvider";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const { login, register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const err =
      mode === "login" ? await login(email, password) : await register(name, email, password);
    if (err) {
      setError(err);
      setBusy(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="card">
        <h1 className="text-2xl font-black">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
        <p className="mt-2 text-sm text-neutral-400">
          {mode === "login"
            ? "Sign in to your own AutonomaX business workspace."
            : "Register free to unlock a personal tracking dashboard."}
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === "register" && (
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm outline-none focus:border-sky/50"
              />
            </div>
          )}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@company.com"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm outline-none focus:border-sky/50"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="At least 6 characters"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm outline-none focus:border-sky/50"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-steel px-6 py-3.5 text-sm font-black text-white transition hover:brightness-110 disabled:opacity-50"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-neutral-400">
          {mode === "login" ? (
            <>New here? <Link href="/register" className="font-bold text-sky">Create an account</Link></>
          ) : (
            <>Already registered? <Link href="/login" className="font-bold text-sky">Sign in</Link></>
          )}
        </p>
      </div>
    </div>
  );
}
