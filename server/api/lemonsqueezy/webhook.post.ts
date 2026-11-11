import { paymentConfig, tierForVariant } from "~/server/utils/config";
import { commitFiles } from "~/server/utils/github";
import { isValidSignature } from "~/server/utils/lemonsqueezy";
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

  const ext = String(custom.image_ext || "");
  const image = ["png", "jpg", "webp"].includes(ext) ? await readPendingImage(custom.submission_id, ext) : null;
  const imageFile = image ? `${slug}.${ext}` : FALLBACK_IMAGE;
  if (!image) log("pending image missing — publishing with placeholder; replace it manually", custom.submission_id);

  const files = [
    {
      path: markdownPath(slug),
      content: Buffer.from(buildMarkdown(fields, { tier, image: imageFile, orderId }), "utf8"),
    },
  ];
  if (image) files.push({ path: imagePath(imageFile), content: image });

  const sha = await commitFiles(files, `feat: add ${fields.title} (paid ${tier}, order ${orderId})`);
  log(`published ${slug} (${tier}) in ${sha}`);

  if (image) await deletePendingImage(custom.submission_id, ext).catch(() => {});

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
