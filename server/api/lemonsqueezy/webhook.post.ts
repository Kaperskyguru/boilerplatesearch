import { paymentConfig, tierForVariant } from "~/server/utils/config";
import { commitFiles } from "~/server/utils/github";
import { isValidSignature } from "~/server/utils/lemonsqueezy";
import { listingKey, pendingKey, r2Copy, r2Delete, r2Enabled, r2PublicUrl } from "~/server/utils/r2";
import {
  FALLBACK_IMAGE,
  buildMarkdown,
  deletePendingImage,
  imagePath,
  markdownPath,
  readPendingImage,
  resolveSlug,
  validateFields,
} from "~/server/utils/submissions";

// Lemon Squeezy order webhook: publishes a paid submission by committing its
// markdown + image to GitHub, then pings the deploy hook.
// Non-2xx makes Lemon Squeezy retry, so we only fail on errors worth retrying.
export default defineEventHandler(async (event) => {
  const raw = (await readRawBody(event, false)) as Buffer | undefined;
  if (!raw || !isValidSignature(raw, getHeader(event, "x-signature"))) {
    throw createError({ statusCode: 401, statusMessage: "Invalid signature" });
  }

  const payload = JSON.parse(raw.toString("utf8"));
  const eventName = payload?.meta?.event_name;
  const order = payload?.data;
  const attrs = order?.attributes || {};
  const custom = payload?.meta?.custom_data || {};
  const orderId = String(order?.id || "");
  const log = (msg: string, extra: unknown = "") => console.log(`[lemon-webhook] order=${orderId} ${msg}`, extra);

  // The store sells other products too; ignore everything that is not a paid
  // order for one of our submission variants.
  if (eventName !== "order_created") return { ok: true, ignored: `event ${eventName}` };
  const cfg = paymentConfig();
  if (cfg.lemonStoreId && String(attrs.store_id) !== cfg.lemonStoreId) return { ok: true, ignored: "other store" };
  const tier = tierForVariant(attrs.first_order_item?.variant_id);
  if (!tier) return { ok: true, ignored: "not a submission product" };
  if (attrs.status !== "paid") {
    log(`not paid (status=${attrs.status}), skipping`);
    return { ok: true, ignored: `status ${attrs.status}` };
  }
  if (!custom.submission_id) {
    log("paid submission order without submission data — add manually", { email: attrs.user_email });
    return { ok: true, ignored: "no submission data" };
  }

  const { fields, error } = validateFields({ ...custom, email: attrs.user_email || "noreply@example.com" });
  if (!fields) {
    log(`submission data invalid (${error}) — add manually`, custom);
    return { ok: true, ignored: "invalid submission data" };
  }

  const { slug, alreadyPublished } = await resolveSlug(fields.title, orderId);
  if (alreadyPublished) {
    log(`already published as ${slug}`);
    return { ok: true, slug, alreadyPublished: true };
  }

  // Image: prefer R2 (copy pending -> permanent key, card loads it from R2).
  // Fall back to the legacy disk upload (committed into the repo), then to the
  // placeholder so a paid listing is never lost over a missing image.
  const ext = String(custom.image_ext || "");
  const validExt = ["png", "jpg", "webp"].includes(ext);
  let imageRef = FALLBACK_IMAGE;
  let repoImage: Buffer | null = null;
  const pendingR2 = r2Enabled() && validExt ? pendingKey(custom.submission_id, ext) : null;
  if (pendingR2) {
    const to = listingKey(slug, ext);
    if (to && (await r2Copy(pendingR2, to, ext))) imageRef = r2PublicUrl(to);
  }
  if (imageRef === FALLBACK_IMAGE && validExt) {
    repoImage = await readPendingImage(custom.submission_id, ext);
    if (repoImage) imageRef = `${slug}.${ext}`;
  }
  if (imageRef === FALLBACK_IMAGE) log("pending image missing — publishing with placeholder; replace it manually", custom.submission_id);

  const files = [
    {
      path: markdownPath(slug),
      content: Buffer.from(buildMarkdown(fields, { tier, image: imageRef, orderId }), "utf8"),
    },
  ];
  if (repoImage) files.push({ path: imagePath(imageRef), content: repoImage });

  const sha = await commitFiles(files, `feat: add ${fields.title} (paid ${tier}, order ${orderId})`);
  log(`published ${slug} (${tier}) in ${sha}`);

  if (repoImage) await deletePendingImage(custom.submission_id, ext).catch(() => {});
  if (pendingR2) await r2Delete(pendingR2).catch(() => {}); // the lifecycle rule would also clear it

  if (cfg.deployHookUrl) {
    try {
      const res = await fetch(cfg.deployHookUrl, { method: "POST" });
      if (!res.ok) log(`deploy hook returned ${res.status}`);
    } catch (err) {
      log("deploy hook failed", err);
    }
  }

  return { ok: true, slug, tier, commit: sha };
});
