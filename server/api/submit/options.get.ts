import { paymentConfig } from "~/server/utils/config";
import { variantPrice } from "~/server/utils/lemonsqueezy";

// Tiers and their live Lemon Squeezy prices for the submit form.
// Featured is offered only once its variant ID is configured.
export default defineEventHandler(async () => {
  const cfg = paymentConfig();
  if (!cfg.listingVariantId) {
    throw createError({ statusCode: 503, statusMessage: "Submissions are not configured yet." });
  }
  const tiers = [{ id: "listing", name: "Listing", price: await variantPrice(cfg.listingVariantId) }];
  if (cfg.featuredVariantId) {
    tiers.push({ id: "featured", name: "Featured", price: await variantPrice(cfg.featuredVariantId) });
  }
  return { tiers };
});
