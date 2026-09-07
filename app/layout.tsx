import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIKAGAN — Autonomous AI Agency Pipeline",
  description:
    "AIKAGAN-web_revised: an independent, self-sufficient AI agency pipeline. Diagnose an observable pain, contract a bounded mission, compose the right capabilities, deliver and measure — with evidence at every gate.",
  metadataBase: new URL("https://aikagan-web-revised.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink text-white antialiased">
        <Nav />
        <main>{children}</main>
        <footer className="border-t border-white/5 py-10">
          <div className="mx-auto max-w-7xl px-6 text-sm text-neutral-500">
            <p>AIKAGAN-web_revised · an independent, self-sufficient autonomous AI agency pipeline.</p>
            <p className="mt-2 text-xs text-neutral-600">
              This is a parallel rebuild. It is not connected to the live aikagan.com storefront.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
