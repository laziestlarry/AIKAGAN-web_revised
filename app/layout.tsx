import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutonomaX — Your money-making copilot",
  description:
    "AutonomaX is a self-sufficient autonomous AI business copilot. It finds where you lose time and money, builds a bounded fix, runs the whole factory for you, and reports back in plain language. Intelligence, control, assurance — at every step.",
  metadataBase: new URL("https://autonomax.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink text-white antialiased">
        <AuthProvider>
          <Nav />
          <main>{children}</main>
          <footer className="border-t border-white/5 py-10">
            <div className="mx-auto max-w-7xl px-6 text-sm text-neutral-500">
              <p>AutonomaX — the partner that runs the machine so you stay the captain.</p>
              <p className="mt-2 text-xs text-neutral-600">Save time. Find what pays. Build it once, automate it after.</p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
