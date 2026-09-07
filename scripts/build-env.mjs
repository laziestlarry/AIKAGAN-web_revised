#!/usr/bin/env node
// build-env.mjs
// Merges secrets from the referenced source env files into this repo's .env.
// It NEVER prints values — only key names. The resulting .env is gitignored.
//
// Usage:
//   node scripts/build-env.mjs \
//     --aikagan "/Users/pq/pq_works/AIKAGAN-web/.env.production" \
//     --ops "/Users/pq/pq_works/projects/autonomax_revenue_ops/.env"
import fs from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
function arg(name) {
  const i = argv.indexOf(name);
  return i !== -1 ? argv[i + 1] : null;
}

const aikaganPath = arg("--aikagan") ?? "/Users/pq/pq_works/AIKAGAN-web/.env.production";
const opsPath = arg("--ops") ?? "/Users/pq/pq_works/projects/autonomax_revenue_ops/.env";
const examplePath = path.resolve(process.cwd(), ".env.example");
const outPath = path.resolve(process.cwd(), ".env");

function parse(file) {
  const out = {};
  if (!fs.existsSync(file)) return out;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

// Keys this app actually consumes.
const wanted = new Set([
  "PAYMENT_RAIL", "STRIPE_SECRET_KEY", "GUMROAD_TOKEN", "GUMROAD_PRODUCT_URL",
  "PADDLE_API_KEY", "PADDLE_CLIENT_TOKEN", "PADDLE_WEBHOOK_SECRET",
  "KV_REST_API_URL", "KV_REST_API_TOKEN",
  "NEXT_PUBLIC_APP_ORIGIN", "NEXT_PUBLIC_SITE_URL",
  "OPENAI_API_KEY", "ANTHROPIC_API_KEY", "GEMINI_API_KEY",
  "SCRAPINGBEE_API_KEY", "ASSEMBLYAI_API_KEY",
  "AUTONOMAX_BRAND_NAME", "AUTONOMAX_BRAND_DOMAIN", "AUTONOMAX_MODE",
  "AUTONOMAX_API_BASE_URL", "AUTONOMAX_API_KEY", "AUTONOMAX_SUPPORT_EMAIL",
  "SHOPIER_PAT", "LEMONSQUEEZY_API_KEY", "LEMONSQUEEZY_STORE_ID",
]);

const merged = { ...parse(examplePath), ...parse(aikaganPath), ...parse(opsPath) };
const selected = {};
const keys = [];
for (const [k, v] of Object.entries(merged)) {
  if (wanted.has(k)) {
    selected[k] = v;
    keys.push(k);
  }
}
if (!selected.PAYMENT_RAIL) selected.PAYMENT_RAIL = "demo";
if (!selected.NEXT_PUBLIC_APP_ORIGIN) selected.NEXT_PUBLIC_APP_ORIGIN = "http://localhost:3000";

fs.writeFileSync(outPath, Object.entries(selected).map(([k, v]) => `${k}=${v}`).join("\n") + "\n");
console.log("Wrote", outPath);
console.log("Keys copied (values hidden):", keys.join(", ") || "(none matched)");
console.log("PAYMENT_RAIL:", selected.PAYMENT_RAIL);
