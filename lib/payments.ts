import { priceCents } from "./products";
import type { Offer } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Payment rail — provider-agnostic adapter.
//  - "demo"   : sandbox checkout that returns a simulated provider URL. Enables
//               the full loop to be exercised and deployed free with no keys.
//  - "stripe" : produces a Stripe Checkout Session URL when STRIPE_SECRET_KEY
//               is set.
//  - "gumroad"/"paddle"/"shopier" : URL passthrough / hosted product link when
//               the matching env is present.
// ─────────────────────────────────────────────────────────────────────────────
export interface CheckoutParams {
  offer: Offer;
  orderId: string;
  email: string | null;
  attribution: { source: string | null; campaign: string | null };
}

export interface CheckoutResult {
  rail: string;
  url: string;
  paymentId: string;
  simulated: boolean;
}

function rail(): string {
  return (process.env.PAYMENT_RAIL ?? "demo").toLowerCase();
}

export function isSimulated(): boolean {
  return rail() === "demo";
}

export function origin(): string {
  return process.env.NEXT_PUBLIC_APP_ORIGIN ?? "http://localhost:3000";
}

export async function createCheckout(params: CheckoutParams): Promise<CheckoutResult> {
  const r = rail();
  const cents = priceCents(params.offer);

  if (r === "stripe" && process.env.STRIPE_SECRET_KEY) {
    return stripeCheckout(params, cents);
  }
  if (r === "gumroad" && process.env.GUMROAD_PRODUCT_URL) {
    const url = new URL(process.env.GUMROAD_PRODUCT_URL);
    return { rail: "gumroad", url: url.toString(), paymentId: params.orderId, simulated: false };
  }
  if (r === "paddle" && process.env.PADDLE_API_KEY) {
    return {
      rail: "paddle",
      url: `${origin()}/checkout?paddle=${encodeURIComponent(params.orderId)}`,
      paymentId: params.orderId,
      simulated: false,
    };
  }

  // Default demo sandbox: a clearly-labelled simulated checkout.
  return {
    rail: "demo",
    url: `${origin()}/checkout?demo=${encodeURIComponent(params.orderId)}&amount=${cents}`,
    paymentId: `demo_${params.orderId}`,
    simulated: true,
  };
}

async function stripeCheckout(params: CheckoutParams, cents: number): Promise<CheckoutResult> {
  const secret = process.env.STRIPE_SECRET_KEY!;
  const session = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      mode: "payment",
      "line_items[0][price_data][currency]": "usd",
      "line_items[0][price_data][product_data][name]": params.offer.name,
      "line_items[0][price_data][unit_amount]": String(cents),
      "line_items[0][quantity]": "1",
      success_url: `${origin()}/checkout/success?order=${params.orderId}&provider=stripe`,
      cancel_url: `${origin()}/offers?canceled=${params.offer.slug}`,
      "metadata[order_id]": params.orderId,
    }).toString(),
  });
  const data = (await session.json()) as { id?: string; url?: string };
  return {
    rail: "stripe",
    url: data.url ?? `${origin()}/checkout?stripe_error=1`,
    paymentId: data.id ?? params.orderId,
    simulated: false,
  };
}
