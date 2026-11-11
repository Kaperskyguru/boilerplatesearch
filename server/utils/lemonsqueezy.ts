import { createHmac, timingSafeEqual } from "node:crypto";
import { paymentConfig } from "./config";

const API = "https://api.lemonsqueezy.com/v1";

async function lemon(path: string, init: { method?: string; body?: unknown } = {}) {
  const { lemonApiKey } = paymentConfig();
  if (!lemonApiKey) throw new Error("LEMONSQUEEZY_API_KEY is not set");
  const res = await fetch(`${API}${path}`, {
    method: init.method || "GET",
    headers: {
      Authorization: `Bearer ${lemonApiKey}`,
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
  });
  const json: any = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = json?.errors?.[0]?.detail || res.statusText;
    throw new Error(`Lemon Squeezy ${init.method || "GET"} ${path} failed (${res.status}): ${detail}`);
  }
  return json;
}

// Variant prices change rarely; cache briefly so the submit page does not hit
// Lemon Squeezy on every view.
const priceCache = new Map<string, { value: string; at: number }>();
const PRICE_TTL_MS = 10 * 60 * 1000;

export async function variantPrice(variantId: string): Promise<string> {
  const hit = priceCache.get(variantId);
  if (hit && Date.now() - hit.at < PRICE_TTL_MS) return hit.value;
  const json = await lemon(`/variants/${variantId}`);
  const cents = Number(json?.data?.attributes?.price ?? 0);
  const value = `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
  priceCache.set(variantId, { value, at: Date.now() });
  return value;
}

export async function createCheckout(opts: {
  variantId: string;
  email: string;
  custom: Record<string, string>;
  redirectUrl: string;
}): Promise<string> {
  const { lemonStoreId } = paymentConfig();
  if (!lemonStoreId) throw new Error("LEMONSQUEEZY_STORE_ID is not set");
  const json = await lemon("/checkouts", {
    method: "POST",
    body: {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: { email: opts.email, custom: opts.custom },
          product_options: {
            redirect_url: opts.redirectUrl,
            enabled_variants: [Number(opts.variantId)],
          },
        },
        relationships: {
          store: { data: { type: "stores", id: String(lemonStoreId) } },
          variant: { data: { type: "variants", id: String(opts.variantId) } },
        },
      },
    },
  });
  const url = json?.data?.attributes?.url;
  if (!url) throw new Error("Lemon Squeezy returned no checkout URL");
  return url;
}

// Lemon Squeezy signs the raw request body with HMAC-SHA256 (hex) in X-Signature.
export function isValidSignature(rawBody: Buffer, signature: string | undefined): boolean {
  const { lemonWebhookSecret } = paymentConfig();
  if (!lemonWebhookSecret || !signature) return false;
  const expected = createHmac("sha256", lemonWebhookSecret).update(rawBody).digest();
  let given: Buffer;
  try {
    given = Buffer.from(signature, "hex");
  } catch {
    return false;
  }
  return given.length === expected.length && timingSafeEqual(given, expected);
}
