import { randomUUID } from "node:crypto";
import { paymentConfig, variantForTier, type Tier } from "~/server/utils/config";
import { createCheckout } from "~/server/utils/lemonsqueezy";
import {
  MAX_IMAGE_BYTES,
  imageExtension,
  prunePendingImages,
  resolveSlug,
  savePendingImage,
  validateFields,
} from "~/server/utils/submissions";

// Validates a submission, parks its image on disk, and returns a Lemon Squeezy
// checkout URL. Nothing is published here; the webhook publishes after payment.
export default defineEventHandler(async (event) => {
  const length = Number(getHeader(event, "content-length") || 0);
  if (length > MAX_IMAGE_BYTES + 64 * 1024) {
    throw createError({ statusCode: 413, statusMessage: "Image must be 2 MB or smaller." });
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

  // Fails fast on a name that cannot get a slug; the webhook re-resolves at publish time.
  await resolveSlug(fields.title);

  const id = randomUUID();
  await prunePendingImages().catch((err) => console.error("[submit] prune failed", err));
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
