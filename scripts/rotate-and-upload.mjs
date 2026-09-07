#!/usr/bin/env node
// rotate-and-upload.mjs
// Reads the local .env and uploads the keys to a free host (Vercel / Netlify).
// Rotation guidance is printed as a safe checklist; this script does NOT touch
// provider accounts. Use --dry-run (default) to preview, and only remove it
// after you have verified every value is correct.
//
// Usage:
//   node scripts/rotate-and-upload.mjs                 # dry run (default)
//   node scripts/rotate-and-upload.mjs --vercel        # upload to Vercel env
//   node scripts/rotate-and-upload.mjs --netlify       # upload to Netlify env
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const argv = process.argv.slice(2);
const isVercel = argv.includes("--vercel");
const isNetlify = argv.includes("--netlify");
const dryRun = !isVercel && !isNetlify;

const envPath = path.resolve(process.cwd(), ".env");
if (!fs.existsSync(envPath)) {
  console.error("No .env found. Run: node scripts/build-env.mjs");
  process.exit(1);
}

const entries = {};
for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m) entries[m[1]] = m[2];
}
const keys = Object.keys(entries);

console.log("Rotation checklist — do this before/while uploading:\n");
console.log("1. Revoke/rotate any secret exposed in a public repo or chat.");
console.log("2. Set a NEW secret value in the provider dashboard.");
console.log("3. Re-run build-env.mjs to sync the new value into .env.");
console.log("4. Upload (below). Never paste a secret into chat or a ticket.");
console.log("5. Verify the value works in the deployed app before going live.");
console.log("");

if (dryRun) {
  console.log(`DRY RUN — would upload ${keys.length} key(s) to ${isVercel ? "Vercel" : isNetlify ? "Netlify" : "a host"}:`);
  console.log(keys.map((k) => `  • ${k}`).join("\n"));
  console.log("\nRe-run with --vercel or --netlify to actually push.");
  process.exit(0);
}

const cmd = (c) => {
  console.log("$", c);
  return execSync(c, { stdio: "inherit", env: process.env });
};

if (isVercel) {
  for (const k of keys) {
    // Vercel stores env as secrets; values are pulled from the local .env.
    const value = entries[k];
    const label = value.length > 6 ? "<redacted>" : value;
    console.log(`Uploading ${k} → Vercel (value: ${label})`);
    try {
      execSync(`printf '%s' "${value.replace(/"/g, '\\"')}" | vercel env add ${k} production`, { stdio: "pipe", shell: "/bin/zsh" });
    } catch (e) {
      console.log(`  ⚠ skip ${k}: ${String(e.message).split("\n")[0]}`);
    }
  }
  cmd("vercel --prod");
} else if (isNetlify) {
  for (const k of keys) {
    const value = entries[k];
    const label = value.length > 6 ? "<redacted>" : value;
    console.log(`Uploading ${k} → Netlify (value: ${label})`);
    try {
      execSync(`netlify env:set ${k} "${value.replace(/"/g, '\\"')}"`, { stdio: "pipe", shell: "/bin/zsh" });
    } catch (e) {
      console.log(`  ⚠ skip ${k}: ${String(e.message).split("\n")[0]}`);
    }
  }
}
