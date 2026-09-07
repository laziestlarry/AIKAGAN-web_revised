import type { VerticalId } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Niche-specific profiler. Each lane asks its OWN questions and produces a
// personalised profile of the visitor — not a generic quiz that routes everyone
// to the same offer. This is the "how does this intelligence see me" layer.
// ─────────────────────────────────────────────────────────────────────────────
export interface PersonaQuestion {
  id: string;
  text: string;
  options: string[];
}

export interface PersonaSignal {
  label: string;
  strength: number; // 0-100
}

export interface PersonaFocus {
  title: string;
  why: string;
  move: string;
}

export interface PersonaProfile {
  vertical: VerticalId;
  lane: string;
  headline: string;
  situation: string;
  signals: PersonaSignal[];
  strengths: string[];
  focus: PersonaFocus[];
  matchedOfferSlug: string;
  score: number;
  emoji: string;
}

export interface PersonaLane {
  id: VerticalId;
  title: string;
  emoji: string;
  headline: string;
  questions: PersonaQuestion[];
}

export const personaLanes: PersonaLane[] = [
  {
    id: "creator-rescue",
    title: "Creator",
    emoji: "🎬",
    headline: "Profile your channel's momentum",
    questions: [
      { id: "size", text: "How big is your audience today?", options: ["Under 10k", "10k–50k", "50k–250k", "250k+"] },
      { id: "trend", text: "What has your last 30 days of views done?", options: ["Flat", "Declining", "Growing", "Up and down"] },
      { id: "cadence", text: "How often do you publish?", options: ["Rarely", "Once a month", "Every 1–2 weeks", "Weekly or more"] },
      { id: "packaging", text: "How do your titles and thumbnails usually perform?", options: ["Hit or miss", "Consistently decent", "I don't really know", "Strong"] },
      { id: "money", text: "How do you make money from the channel?", options: ["Not yet", "Ads only", "Ads + sponsors", "Products / services too"] },
      { id: "time", text: "How much time does one video take you?", options: ["20+ hours", "10–20 hours", "5–10 hours", "Under 5 hours"] },
    ],
  },
  {
    id: "store-rescue",
    title: "Store",
    emoji: "🛒",
    headline: "Profile where your buyers drop off",
    questions: [
      { id: "traffic", text: "How much traffic do you get monthly?", options: ["Under 1k", "1k–10k", "10k–50k", "50k+"] },
      { id: "conversion", text: "About how many visitors buy?", options: ["Under 0.5%", "0.5–2%", "2–4%", "Over 4%"] },
      { id: "checkout", text: "What happens at checkout?", options: ["Lots abandon", "Some abandon", "Smooth", "I don't track it"] },
      { id: "proof", text: "Do you show proof before asking for money?", options: ["No", "Some", "Reviews only", "Strong proof"] },
      { id: "offer", text: "Can a new visitor understand your offer fast?", options: ["Not really", "Partly", "Mostly", "Yes"] },
      { id: "follow", text: "What happens to people who don't buy today?", options: ["They leave", "They get an email", "A free thing", "Nothing"] },
    ],
  },
  {
    id: "agency-rescue",
    title: "Agency",
    emoji: "🏢",
    headline: "Profile your delivery bottleneck",
    questions: [
      { id: "workload", text: "How much of your work is repetitive?", options: ["Almost all", "Most", "Some", "Little"] },
      { id: "handoff", text: "How do client handoffs happen?", options: ["In chat / messy", "Docs", "Templates", "A system"] },
      { id: "margin", text: "How does your margin feel?", options: ["Squeezed", "Okay", "Good", "Great"] },
      { id: "leads", text: "Do you have a steady lead flow?", options: ["No", "Inconsistent", "Steady", "Too many"] },
      { id: "hours", text: "How many hours do you bill vs actually work?", options: ["I work way more", "A bit more", "About even", "Less"] },
      { id: "automation", text: "Have you automated anything yet?", options: ["Nothing", "A little", "A lot", "I run on systems"] },
    ],
  },
  {
    id: "expert-rescue",
    title: "Expert",
    emoji: "🎓",
    headline: "Profile your know-how's earning power",
    questions: [
      { id: "knowhow", text: "What do people already ask you for help with?", options: ["One thing", "A few things", "Many things", "Everything"] },
      { id: "revenue", text: "How do you earn from your expertise?", options: ["Not yet", "Hourly", "Projects", "A product or course"] },
      { id: "time", text: "How much of your week is unbilled?", options: ["Most", "Half", "Some", "Little"] },
      { id: "repeat", text: "Do clients come back?", options: ["No", "Sometimes", "Often", "They keep returning"] },
      { id: "assets", text: "Do you have reusable materials?", options: ["No", "A few docs", "Templates", "A full library"] },
      { id: "demand", text: "How do you get new clients?", options: ["Referrals only", "Networking", "Content", "A pipeline"] },
    ],
  },
  {
    id: "local-rescue",
    title: "Local",
    emoji: "🏪",
    headline: "Profile your digital front door",
    questions: [
      { id: "calls", text: "How do most customers find you?", options: ["Word of mouth", "Google", "Social", "Ads"] },
      { id: "site", text: "Does your website make you money?", options: ["No", "It's a brochure", "It gets some leads", "Yes"] },
      { id: "booking", text: "Can customers book or buy online?", options: ["No", "By phone", "A form", "Yes, online"] },
      { id: "hours", text: "What happens after hours?", options: ["They wait", "Voicemail", "A form", "They can book"] },
      { id: "followup", text: "Do you follow up with interested customers?", options: ["No", "Sometimes", "Often", "A system does"] },
      { id: "reviews", text: "How are your reviews / reputation?", options: ["Thin", "Okay", "Good", "Excellent"] },
    ],
  },
  {
    id: "saas-rescue",
    title: "SaaS",
    emoji: "📈",
    headline: "Profile your activation & retention",
    questions: [
      { id: "signups", text: "How many signups per month?", options: ["Under 100", "100–500", "500–2k", "2k+"] },
      { id: "activation", text: "How many reach the 'aha' moment?", options: ["Very few", "Some", "Many", "Most"] },
      { id: "retention", text: "How do users stick around?", options: ["They churn", "Mixed", "Decent", "Strong"] },
      { id: "onboarding", text: "What is onboarding like?", options: ["Manual / hard", "Guided", "Mostly automated", "Excellent"] },
      { id: "usage", text: "Do you know which feature keeps users?", options: ["No idea", "A guess", "Some data", "Yes"] },
      { id: "expand", text: "Do users upgrade or expand?", options: ["No", "Rarely", "Sometimes", "Often"] },
    ],
  },
];

export function getPersonaLane(id: string): PersonaLane | undefined {
  return personaLanes.find((l) => l.id === id);
}

// Map answer index (0-based) → narrative for each question. Used to build a
// specific "situation" sentence per lane.
const narrative: Record<VerticalId, Record<string, string[]>> = {
  "creator-rescue": {
    size: ["a small but real audience", "a solid mid-size audience", "a large audience", "a big audience with real reach"],
    trend: ["holding steady", "quietly shrinking", "growing", "volatile"],
    cadence: ["publishing rarely", "posting about once a month", "publishing every 1–2 weeks", "publishing weekly or more"],
    packaging: ["with hit-or-miss packaging", "with decent but inconsistent packaging", "without a clear read on packaging", "with strong packaging"],
    money: ["not yet monetised", "earning from ads", "earning from ads and sponsors", "earning from products and services too"],
    time: ["spending 20+ hours per video", "spending 10–20 hours per video", "spending 5–10 hours per video", "moving fast at under 5 hours"],
  },
  "store-rescue": {
    traffic: ["a thin traffic stream", "a modest traffic stream", "a healthy traffic stream", "a strong traffic stream"],
    conversion: ["very few buyers", "a low conversion", "a reasonable conversion", "a strong conversion"],
    checkout: ["with heavy checkout abandonment", "with some abandonment", "with a smooth checkout", "without clear checkout tracking"],
    proof: ["without much proof", "with some proof", "with reviews but little proof", "with strong proof"],
    offer: ["an unclear offer", "a partly clear offer", "a mostly clear offer", "a clear offer"],
    follow: ["leaving non-buyers to disappear", "capturing some leads", "offering a free thing", "with a follow-up path"],
  },
  "agency-rescue": {
    workload: ["a heavily repetitive workload", "a mostly repetitive workload", "some repetitive work", "a light repetitive load"],
    handoff: ["with messy in-chat handoffs", "with document handoffs", "with template handoffs", "with a real system"],
    margin: ["a squeezed margin", "an okay margin", "a good margin", "a strong margin"],
    leads: ["an inconsistent lead flow", "a steady lead flow", "a strong lead flow", "more leads than you can handle"],
    hours: ["working far more than you bill", "working a bit more than you bill", "working about what you bill", "working less than you bill"],
    automation: ["with no automation", "with a little automation", "with a lot of automation", "running on systems"],
  },
  "expert-rescue": {
    knowhow: ["one clear specialty", "a few specialties", "a broad range", "a wide body of know-how"],
    revenue: ["earning nothing from it yet", "selling by the hour", "selling projects", "selling a product or course"],
    time: ["spending most of the week unbilled", "about half the week unbilled", "some unbilled time", "little unbilled time"],
    repeat: ["with one-time clients", "with returning clients", "with frequent returning clients", "with clients who keep coming back"],
    assets: ["with no reusable materials", "with a few documents", "with templates", "with a full library"],
    demand: ["relying on referrals", "networking for work", "earning through content", "running a pipeline"],
  },
  "local-rescue": {
    calls: ["found mostly by word of mouth", "found on Google", "found on social", "found through ads"],
    site: ["with a site that doesn't sell", "with a brochure site", "with a site that gets some leads", "with a site that brings business"],
    booking: ["with no way to book online", "booking by phone", "with a contact form", "with online booking"],
    hours: ["leaving customers waiting after hours", "sending them to voicemail", "capturing a form", "letting them book online"],
    followup: ["not following up", "following up sometimes", "following up often", "with an automated follow-up"],
    reviews: ["with a thin reputation", "with an okay reputation", "with a good reputation", "with an excellent reputation"],
  },
  "saas-rescue": {
    signups: ["under a hundred signups", "a hundred to five hundred", "five hundred to two thousand", "over two thousand"],
    activation: ["with very few reaching the 'aha'", "with some reaching the 'aha'", "with many reaching the 'aha'", "with most reaching the 'aha'"],
    retention: ["with heavy churn", "with mixed retention", "with decent retention", "with strong retention"],
    onboarding: ["with manual, hard onboarding", "with guided onboarding", "with mostly automated onboarding", "with excellent onboarding"],
    usage: ["without knowing the key feature", "with only a guess", "with some data", "with a clear read on usage"],
    expand: ["with no upgrades", "with rare upgrades", "with occasional upgrades", "with frequent expansion"],
  },
};

const focusMap: Record<VerticalId, { title: string; why: string; move: string }[]> = {
  "creator-rescue": [
    { title: "Rebuild momentum with one experiment", why: "Flat or falling views usually means the audience's interests moved and the packaging hasn't.", move: "Run one data-led content experiment instead of guessing." },
    { title: "Cut the production burden", why: "High time-per-video caps your output and burns you out.", move: "Hand the repetitive production load to a system." },
    { title: "Turn views into income", why: "If the channel isn't monetised, the equity is idle.", move: "Add one offer the audience actually wants." },
  ],
  "store-rescue": [
    { title: "Fix the offer-to-checkout drop", why: "Traffic that doesn't convert is wasted ad spend and lost sales.", move: "Teardown the path and remove the friction." },
    { title: "Add proof before the ask", why: "Buyers decide on evidence, not promises.", move: "Compose proof and demonstration near the buy action." },
    { title: "Stop losing non-buyers", why: "Most visitors leave; a follow-up path captures the value.", move: "Give non-buyers a useful next step." },
  ],
  "agency-rescue": [
    { title: "Automate the repetitive delivery", why: "Manual fulfillment caps capacity and squeezes margin.", move: "Map the bottleneck and automate one workflow." },
    { title: "Fix messy handoffs", why: "In-chat handoffs cause rework and client confusion.", move: "Standardise the handoff with templates." },
    { title: "Reclaim unbilled hours", why: "Working more than you bill is silent revenue loss.", move: "Shift the repetitive work onto a system." },
  ],
  "expert-rescue": [
    { title: "Productize your know-how", why: "Selling hours caps income and leaks unbilled time.", move: "Package one outcome as a product." },
    { title: "Build a repeatable offer", why: "One-time clients mean constant hunting.", move: "Add a path that brings clients back." },
    { title: "Turn materials into assets", why: "Reusable templates compound your output.", move: "Convert your docs into a sellable kit." },
  ],
  "local-rescue": [
    { title: "Make the site sell", why: "A brochure site converts demand into nothing.", move: "Add a clear path to book or buy." },
    { title: "Capture after-hours demand", why: "Customers who can't book after hours go elsewhere.", move: "Add a booking or capture path." },
    { title: "Follow up with interest", why: "Interested customers who aren't followed up are lost.", move: "Add a simple follow-up loop." },
  ],
  "saas-rescue": [
    { title: "Fix activation", why: "Signups that never reach the 'aha' churn.", move: "Teardown onboarding and remove the barrier." },
    { title: "Find the retention feature", why: "Unknown usage means you can't fix churn.", move: "Instrument usage and double down on what keeps users." },
    { title: "Create an expansion path", why: "No upgrades means no growing revenue.", move: "Add a natural next step for active users." },
  ],
};

const offerByVertical: Record<VerticalId, string> = {
  "creator-rescue": "creator-pilot",
  "store-rescue": "conversion-sprint",
  "agency-rescue": "agency-automation",
  "expert-rescue": "expert-product",
  "local-rescue": "local-growth",
  "saas-rescue": "activation-sprint",
};

export function profile(vertical: string, answers: number[]): PersonaProfile {
  const lane = getPersonaLane(vertical);
  const safeLane = lane ?? personaLanes[0];
  const id = safeLane.id;
  const qs = safeLane.questions;

  const situationParts = qs.map((q, i) => {
    const ans = answers[i] ?? 0;
    const text = narrative[id]?.[q.id]?.[ans];
    return text ?? "";
  });

  // Readiness / opportunity score: better answers = higher.
  const raw = answers.reduce((a, b) => a + b, 0) / (qs.length * (qs.length - 1 || 1));
  const score = Math.round(Math.min(100, 20 + raw * 80));

  const signals: PersonaSignal[] = [
    { label: "Audience equity", strength: qs.length > 1 ? 40 + (answers[0] ?? 0) * 20 : 50 },
    { label: "Content engine", strength: qs.length > 2 ? 40 + (answers[1] ?? 0) * 15 : 50 },
    { label: "Monetisation", strength: qs.length > 4 ? 30 + (answers[4] ?? 0) * 20 : 50 },
    { label: "Production burden", strength: qs.length > 5 ? 100 - (answers[5] ?? 0) * 20 : 50 },
  ].map((s) => ({ ...s, strength: Math.max(0, Math.min(100, s.strength)) }));

  const focus = focusMap[id] ?? focusMap["creator-rescue"];

  const strengths = situationParts
    .filter(Boolean)
    .slice(0, 3)
    .map((s) => `You're running ${s}.`);

  const headline = lane?.headline ?? "Your profile";

  return {
    vertical: id,
    lane: safeLane.title,
    headline,
    situation: `You're ${situationParts.filter(Boolean).slice(0, 3).join(", ")}.`,
    signals,
    strengths,
    focus,
    matchedOfferSlug: offerByVertical[id],
    score,
    emoji: safeLane.emoji,
  };
}
