import { AwsClient } from "aws4fetch";
import { paymentConfig } from "./config";

// Cloudflare R2 (S3-compatible) storage for submitted images.
// Everything lives under R2_FOLDER (default "boilerplatesearch") so the bucket
// can be shared with other projects:
//   <folder>/pending/<uuid>.<ext>   uploaded at form submit; set a lifecycle rule
//                                   on this prefix to delete objects after 7 days
//   <folder>/listings/<slug>.<ext>  copied here after payment; served publicly

const CONTENT_TYPES: Record<string, string> = { png: "image/png", jpg: "image/jpeg", webp: "image/webp" };
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function r2Enabled(): boolean {
  const c = paymentConfig();
  return Boolean(c.r2AccessKeyId && c.r2SecretAccessKey && c.r2Bucket && c.r2PublicUrl && (c.r2AccountId || c.r2Endpoint));
}

// Keys are built only from our own UUIDs / validated slugs, never raw input.
const folder = () => paymentConfig().r2Folder;

export function pendingKey(id: string, ext: string): string | null {
  return UUID_RE.test(String(id)) && CONTENT_TYPES[ext] ? `${folder()}/pending/${id}.${ext}` : null;
}

export function listingKey(slug: string, ext: string): string | null {
  return SLUG_RE.test(slug) && CONTENT_TYPES[ext] ? `${folder()}/listings/${slug}.${ext}` : null;
}

export function r2PublicUrl(key: string): string {
  return `${paymentConfig().r2PublicUrl}/${key}`;
}

function objectUrl(key: string): string {
  const c = paymentConfig();
  const base = c.r2Endpoint || `https://${c.r2AccountId}.r2.cloudflarestorage.com`;
  return `${base}/${c.r2Bucket}/${key}`;
}

function client() {
  const c = paymentConfig();
  return new AwsClient({
    accessKeyId: c.r2AccessKeyId,
    secretAccessKey: c.r2SecretAccessKey,
    service: "s3",
    region: "auto",
  });
}

async function fail(action: string, key: string, res: Response): Promise<never> {
  const text = (await res.text().catch(() => "")).slice(0, 200);
  throw new Error(`R2 ${action} ${key} failed (${res.status}): ${text}`);
}

export async function r2Put(key: string, body: Buffer, ext: string) {
  const res = await client().fetch(objectUrl(key), {
    method: "PUT",
    headers: { "content-type": CONTENT_TYPES[ext] },
    body,
  });
  if (!res.ok) await fail("PUT", key, res);
}

// Copies inside the bucket. Returns false only when the source does not exist
// (e.g. an old unpaid upload that already expired); other errors throw so the
// webhook returns 500 and Lemon Squeezy retries.
export async function r2Copy(fromKey: string, toKey: string, ext: string): Promise<boolean> {
  const c = paymentConfig();
  const res = await client().fetch(objectUrl(toKey), {
    method: "PUT",
    headers: {
      "x-amz-copy-source": `/${c.r2Bucket}/${fromKey}`,
      "x-amz-metadata-directive": "REPLACE",
      "content-type": CONTENT_TYPES[ext],
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
  if (res.status === 404) return false;
  if (!res.ok) await fail("COPY", fromKey, res);
  return true;
}

export async function r2Delete(key: string) {
  const res = await client().fetch(objectUrl(key), { method: "DELETE" });
  if (!res.ok && res.status !== 404) await fail("DELETE", key, res);
}
