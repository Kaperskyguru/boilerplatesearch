import { randomUUID } from "node:crypto";
import { paymentConfig, variantForTier, type Tier } from "~/server/utils/config";
import { createCheckout } from "~/server/utils/lemonsqueezy";
import {
  MAX_IMAGE_BYTES,
  imageExtension,
  makeRoomForPendingImage,
  prunePendingImages,
  savePendingImage,
  validateFields,
} from "~/server/utils/submissions";

// Per-IP limit so the form cannot be used to flood disk or the Lemon API.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const MAX_TRACKED_IPS = 10_000;
const recent = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    recent.set(ip, hits);
    return true;
  }
  hits.push(now);
  recent.delete(ip); // re-insert so Map order stays oldest-activity first
  recent.set(ip, hits);
  if (recent.size > MAX_TRACKED_IPS) {
    // Drop the least recently active IPs; never wipe everyone's counters.
    for (const key of recent.keys()) {
      if (recent.size <= MAX_TRACKED_IPS) break;
      recent.delete(key);
    }
  }
  return false;
}

// X-Forwarded-For is client-controlled on the left. A trusted proxy appends the
// address it actually saw, so count TRUSTED_PROXY_HOPS entries from the right
// (default 1 = one proxy in front, e.g. Coolify/Traefik). Set 0 if Node is
// reached directly with no proxy.
function clientIp(event: any): string {
  const hops = Number(process.env.TRUSTED_PROXY_HOPS ?? 1);
  const xff = getHeader(event, "x-forwarded-for");
  if (hops > 0 && xff) {
    const list = xff.split(",").map((v) => v.trim()).filter(Boolean);
    const ip = list[list.length - hops];
    if (ip) return ip;
  }
  return event.node.req.socket.remoteAddress || "unknown";
}

// Validates a submission, parks its image on disk, and returns a Lemon Squeezy
// checkout URL. Nothing is published here; the webhook publishes after payment.
export default defineEventHandler(async (event) => {
  // Require a declared length: Node reads at most that many bytes, so the cap
  // holds. Chunked uploads (no Content-Length) would bypass it.
  const lengthHeader = getHeader(event, "content-length");
  if (!lengthHeader) throw createError({ statusCode: 411, statusMessage: "Content-Length required." });
  if (Number(lengthHeader) > MAX_IMAGE_BYTES + 64 * 1024) {
    throw createError({ statusCode: 413, statusMessage: "Image must be 2 MB or smaller." });
  }

  if (rateLimited(clientIp(event))) {
    throw createError({ statusCode: 429, statusMessage: "Too many submissions. Please try again in a few minutes." });
  }

  const parts = (await readMultipartFormData(event)) || [];
  const input: Record<string, string> = {};
  let image: Buffer | null = null;
  for (const part of parts) {
    if (!part.name) continue;
    if (part.name === "image") image = part.data;
    else input[part.name] = part.data.toString("utf8");
  }

  const { fields, error } = validateFields(input);
  if (!fields) throw createError({ statusCode: 422, statusMessage: error });

  const tier: Tier = input.tier === "featured" ? "featured" : "listing";
  const variantId = variantForTier(tier);
  if (!variantId) throw createError({ statusCode: 422, statusMessage: "That plan is not available." });

  if (!image || image.length === 0) throw createError({ statusCode: 422, statusMessage: "Upload an image." });
  if (image.length > MAX_IMAGE_BYTES) throw createError({ statusCode: 413, statusMessage: "Image must be 2 MB or smaller." });
  const ext = imageExtension(image);
  if (!ext) throw createError({ statusCode: 422, statusMessage: "Image must be PNG, JPG or WebP." });

  // The slug is resolved against GitHub only in the webhook, after payment.
  const id = randomUUID();
  await prunePendingImages().catch((err) => console.error("[submit] prune failed", err));
  await makeRoomForPendingImage().catch((err) => console.error("[submit] eviction failed", err));
  await savePendingImage(id, ext, image);

  try {
    const url = await createCheckout({
      variantId,
      email: fields.email,
      redirectUrl: `${paymentConfig().siteUrl}/submit/success`,
      // Lemon Squeezy stores these and returns them in the order webhook,
      // so the listing survives even if this server restarts before payment.
      custom: {
        submission_id: id,
        image_ext: ext,
        title: fields.title,
        url: fields.url,
        description: fields.description,
        price: fields.price,
        tags: fields.tags.join(","),
      },
    });
    return { url };
  } catch (err) {
    console.error("[submit] checkout creation failed", err);
    throw createError({ statusCode: 502, statusMessage: "Could not start checkout. Please try again." });
  }
});
