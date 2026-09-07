// ─────────────────────────────────────────────────────────────────────────────
// Money-maker scanner — finds real, automatable, get-paid opportunities.
// Brings them to the table, ranks them, and maps a "do once → automate after"
// path. This is the value the customer actually gets: save the boredom of
// repeating robotic actions and turn effort into a repeatable income stream.
// ─────────────────────────────────────────────────────────────────────────────
export interface Opportunity {
  id: string;
  title: string;
  platform: string;
  whatYouDoOnce: string;
  automateAfter: string;
  timeToFirst: string;
  capital: string;
  automation: number; // 0-100
  pay: string;
  score: number;
  verdict: "prime" | "viable" | "watch";
  tags: string[];
}

// Catalog of automatable income opportunities. Each is a real, doable, repeatable
// path that can be run once and then handed to a system.
const catalog: Omit<Opportunity, "score" | "verdict">[] = [
  { id: "op-affiliate", title: "Product review blog with affiliate links", platform: "Blog / SEO", whatYouDoOnce: "Pick a niche, write 5 reviews, add your affiliate link.", automateAfter: "AI drafts + schedules new posts from a keyword feed.", timeToFirst: "1–3 months", capital: "$0", automation: 78, pay: "Commission per sale", tags: ["affiliate", "seo", "content"] },
  { id: "op-pod", title: "Print-on-demand art listing", platform: "Etsy / Printbelle", whatYouDoOnce: "Create a design, set price, publish one listing.", automateAfter: "Listing engine generates title, tags, mockups and price.", timeToFirst: "1–2 weeks", capital: "$0", automation: 82, pay: "Margin per sale", tags: ["pod", "etsy", "design"] },
  { id: "op-gig", title: "AI-assisted service gig", platform: "Fiverr", whatYouDoOnce: "Write one gig (title, packages, FAQ), set scope.", automateAfter: "Copy bot drafts gigs, audit bot checks before publish.", timeToFirst: "3–7 days", capital: "$0", automation: 64, pay: "Per order", tags: ["fiverr", "service", "gig"] },
  { id: "op-digital", title: "Digital template / kit", platform: "Gumroad / Shopier", whatYouDoOnce: "Package one template or guide, set a price.", automateAfter: "Instant delivery via webhook, upsell path wired.", timeToFirst: "1–2 weeks", capital: "$0", automation: 74, pay: "Per download", tags: ["digital", "template", "gumroad"] },
  { id: "op-youtube", title: "Faceless niche channel", platform: "YouTube", whatYouDoOnce: "Plan 10 videos on one topic, set a cadence.", automateAfter: "Script + voice + edit pipeline, scheduled publish.", timeToFirst: "2–6 months", capital: "$0", automation: 60, pay: "Ads / sponsors", tags: ["youtube", "content", "passive"] },
  { id: "op-dm", title: "DM-to-checkout closer", platform: "Social DMs", whatYouDoOnce: "Reply to inbound interest and route to a checkout link.", automateAfter: "Intent classifier + checkout link generated automatically.", timeToFirst: "Days", capital: "$0", automation: 71, pay: "Per sale", tags: ["dm", "sales", "automation"] },
  { id: "op-audit", title: "Diagnostic / audit service", platform: "Fiverr / direct", whatYouDoOnce: "Run one audit and deliver a ranked fix list.", automateAfter: "Intake → audit → delivery runs as a repeatable flow.", timeToFirst: "1 week", capital: "$0", automation: 55, pay: "Per project", tags: ["audit", "service", "diagnostic"] },
  { id: "op-course", title: "Mini-course from existing know-how", platform: "Gumroad / Teachable", whatYouDoOnce: "Record one module, add a worksheet.", automateAfter: "Enrolment + email sequence + upsell automated.", timeToFirst: "1 month", capital: "$0", automation: 68, pay: "Per seat", tags: ["course", "education", "product"] },
  { id: "op-newsletter", title: "Niche newsletter", platform: "Email", whatYouDoOnce: "Write 3 issues on one niche, add a signup.", automateAfter: "Draft + schedule from a curated feed.", timeToFirst: "2–4 weeks", capital: "$0", automation: 72, pay: "Sponsorships", tags: ["email", "newsletter", "recurring"] },
  { id: "op-review", title: "Paid product review", platform: "UserTesting / sites", whatYouDoOnce: "Complete one qualifying review task.", automateAfter: "Alert + task prioritisation auto-runs.", timeToFirst: "Days", capital: "$0", automation: 62, pay: "Per task", tags: ["get-paid", "task", "micro"] },
];

export function scoreOpportunity(o: Omit<Opportunity, "score" | "verdict">): number {
  return Math.round(
    o.automation * 0.5 +
      (o.timeToFirst.startsWith("Days") ? 30 : o.timeToFirst.startsWith("1 week") ? 22 : o.timeToFirst.startsWith("1–2") ? 16 : o.timeToFirst.startsWith("1 month") ? 10 : 4) +
      (o.capital === "$0" ? 15 : 5),
  );
}

export function rankOpportunities(filter?: string): Opportunity[] {
  let list = catalog;
  if (filter) {
    const f = filter.toLowerCase();
    list = list.filter(
      (o) => o.title.toLowerCase().includes(f) || o.platform.toLowerCase().includes(f) || o.tags.some((t) => t.includes(f)),
    );
  }
  return list
    .map((o) => {
      const score = scoreOpportunity(o);
      return { ...o, score, verdict: (score >= 70 ? "prime" : score >= 55 ? "viable" : "watch") as "prime" | "viable" | "watch" };
    })
    .sort((a, b) => b.score - a.score);
}

// Scan raw text (a transcript, a job board paste, or keywords) for opportunity
// signals, mirroring the YouTube-channel scanner pattern.
export function scanSource(source: string): { detected: string[]; signals: string[]; suggested: Opportunity[] } {
  const text = source.toLowerCase();
  const keywords: Record<string, string[]> = {
    affiliate: ["affiliate", "commission", "referral"],
    print_on_demand: ["print on demand", "pod", "redbubble", "teespring", "etsy"],
    fiverr: ["fiverr", "freelance", "gig"],
    digital: ["digital", "template", "gumroad", "download"],
    youtube: ["youtube", "adsense", "channel", "monetization"],
    course: ["course", "teachable", "udemy", "skillshare"],
    newsletter: ["newsletter", "email list", "substack"],
    review: ["user testing", "review task", "get paid", "survey"],
  };
  const detected: string[] = [];
  for (const [tag, kws] of Object.entries(keywords)) {
    if (kws.some((k) => text.includes(k))) detected.push(tag);
  }
  const suggested = rankOpportunities(detected[0]).slice(0, 3);
  return { detected, signals: detected, suggested };
}
