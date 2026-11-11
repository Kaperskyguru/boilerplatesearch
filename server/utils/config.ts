// Server-only settings for paid submissions. Read from process.env at call
// time so the node-server build picks up values set on the host at runtime.
export function paymentConfig() {
  const env = process.env;
  return {
    lemonApiKey: env.LEMONSQUEEZY_API_KEY || "",
    lemonStoreId: env.LEMONSQUEEZY_STORE_ID || "",
    listingVariantId: env.LEMONSQUEEZY_LISTING_VARIANT_ID || "",
    featuredVariantId: env.LEMONSQUEEZY_FEATURED_VARIANT_ID || "",
    lemonWebhookSecret: env.LEMONSQUEEZY_WEBHOOK_SECRET || "",
    githubToken: env.GITHUB_TOKEN || "",
    githubRepo: env.GITHUB_REPO || "Kaperskyguru/boilerplatesearch",
    githubBranch: env.GITHUB_BRANCH || "main",
    deployHookUrl: env.DEPLOY_HOOK_URL || "",
    siteUrl: (env.SITE_URL || "https://boilerplatesearch.com").replace(/\/+$/, ""),
    submissionsDir: env.SUBMISSIONS_DIR || ".data/submissions",
  };
}

export type Tier = "listing" | "featured";

// Maps a paid Lemon Squeezy variant to the tier it buys. The tier is always
// derived from what was paid for, never from what the form claimed.
export function tierForVariant(variantId: string | number): Tier | null {
  const cfg = paymentConfig();
  const id = String(variantId);
  if (cfg.listingVariantId && id === cfg.listingVariantId) return "listing";
  if (cfg.featuredVariantId && id === cfg.featuredVariantId) return "featured";
  return null;
}

export function variantForTier(tier: Tier): string {
  const cfg = paymentConfig();
  return tier === "featured" ? cfg.featuredVariantId : cfg.listingVariantId;
}
