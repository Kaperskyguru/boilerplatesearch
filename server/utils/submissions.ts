import { promises as fs } from "node:fs";
import { join, resolve } from "node:path";
import slugify from "slugify";
import { paymentConfig, type Tier } from "./config";
import { readRepoFile, repoFileExists } from "./github";

export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const PENDING_TTL_MS = 7 * 24 * 60 * 60 * 1000;
// Shown when a paid listing's uploaded image was lost before the webhook ran.
export const FALLBACK_IMAGE = "placeholder.png";

export type SubmissionFields = {
  title: string;
  url: string;
  description: string;
  price: string;
  tags: string[];
  email: string;
};

const TAG_RE = /^[\p{L}\p{N} .+#_-]+$/u;

export function validateFields(input: Record<string, string>): { fields?: SubmissionFields; error?: string } {
  const title = (input.title || "").trim();
  const url = (input.url || "").trim();
  const description = (input.description || "").trim();
  const price = (input.price || "").trim();
  const email = (input.email || "").trim();
  const tags = (input.tags || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .filter((t, i, all) => all.findIndex((x) => x.toLowerCase() === t.toLowerCase()) === i);

  if (!title || title.length > 60) return { error: "Name is required (max 60 characters)." };
  if (!slugify(title, { lower: true, strict: true })) return { error: "Name must contain letters or numbers." };
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { error: "Website URL is not valid." };
  }
  if (!["http:", "https:"].includes(parsed.protocol) || url.length > 300)
    return { error: "Website URL must start with http:// or https://." };
  if (description.length < 20 || description.length > 300)
    return { error: "Description must be 20–300 characters." };
  if (!price || price.length > 30) return { error: "Price is required (e.g. $199 or Free)." };
  // Descriptions are rendered with v-html on listing pages, so no markup is
  // accepted from submitters.
  if ([title, description, price].some((v) => /[<>]/.test(v)))
    return { error: "Name, description and price cannot contain < or >." };
  if (tags.length < 1 || tags.length > 10) return { error: "Add 1–10 tags, separated by commas." };
  if (tags.some((t) => t.length > 30 || !TAG_RE.test(t)))
    return { error: "Tags may only use letters, numbers, spaces and . + # _ - (max 30 characters each)." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200)
    return { error: "Email is not valid." };

  return { fields: { title, url, description, price, tags, email } };
}

// Detects the real image type from its bytes; the browser-supplied type is not trusted.
export function imageExtension(data: Buffer): "png" | "jpg" | "webp" | null {
  if (data.length > 8 && data.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (data.length > 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff) return "jpg";
  if (data.length > 12 && data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WEBP") return "webp";
  return null;
}

export function baseSlug(title: string): string {
  return slugify(title, { lower: true, strict: true });
}

export const markdownPath = (slug: string) => `content/boilerplates/${slug}.md`;
export const imagePath = (file: string) => `public/img/${file}`;

// First free slug in the repo: "name", "name-2", "name-3"...
// A slug whose listing already carries this orderId is "free" for that order,
// which makes webhook retries land on the same file.
export async function resolveSlug(title: string, orderId?: string): Promise<{ slug: string; alreadyPublished: boolean }> {
  const base = baseSlug(title);
  for (let n = 1; n <= 50; n++) {
    const slug = n === 1 ? base : `${base}-${n}`;
    const existing = await readRepoFile(markdownPath(slug));
    if (existing !== null) {
      if (orderId && existing.includes(`orderId: "${orderId}"`)) return { slug, alreadyPublished: true };
      continue;
    }
    // Avoid overwriting an image another listing already uses.
    const imageTaken = await Promise.all(
      ["png", "jpg", "webp"].map((ext) => repoFileExists(imagePath(`${slug}.${ext}`)))
    );
    if (imageTaken.some(Boolean)) continue;
    return { slug, alreadyPublished: false };
  }
  throw new Error(`No free slug found for "${title}"`);
}

export function buildMarkdown(fields: Omit<SubmissionFields, "email">, opts: { tier: Tier; image: string; orderId: string }): string {
  // JSON strings are valid YAML double-quoted scalars, so this escapes safely.
  const q = (v: string) => JSON.stringify(v);
  return [
    "---",
    `title: ${q(fields.title)}`,
    `description: ${q(fields.description)}`,
    `price: ${q(fields.price)}`,
    `tags: [${fields.tags.map(q).join(", ")}]`,
    "isPopular: false",
    "isTrending: false",
    "shouldWriteReview: false",
    `isFeatured: ${opts.tier === "featured"}`,
    `url: ${q(fields.url)}`,
    `image: ${q(opts.image)}`,
    `orderId: ${q(opts.orderId)}`,
    "---",
    "",
  ].join("\n");
}

// ---- Pending images (held on disk between form submit and payment) ----

function pendingDir() {
  return resolve(paymentConfig().submissionsDir);
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EXTS = ["png", "jpg", "webp"];

// submission_id comes back from Lemon custom data, which a buyer can set
// themselves via a public buy link. Only our own UUID + known extension may
// ever become a file name, so it can never point outside pendingDir().
function pendingFile(id: string, ext: string): string | null {
  if (!UUID_RE.test(String(id)) || !EXTS.includes(String(ext))) return null;
  return join(pendingDir(), `${id}.${ext}`);
}

export async function savePendingImage(id: string, ext: string, data: Buffer) {
  const file = pendingFile(id, ext);
  if (!file) throw new Error("Invalid pending image name");
  await fs.mkdir(pendingDir(), { recursive: true });
  await fs.writeFile(file, data);
}

export async function readPendingImage(id: string, ext: string): Promise<Buffer | null> {
  const file = pendingFile(id, ext);
  if (!file) return null;
  try {
    return await fs.readFile(file);
  } catch {
    return null;
  }
}

export async function deletePendingImage(id: string, ext: string) {
  const file = pendingFile(id, ext);
  if (file) await fs.rm(file, { force: true });
}

export const MAX_PENDING_IMAGES = 500;

export async function countPendingImages(): Promise<number> {
  try {
    return (await fs.readdir(pendingDir())).length;
  } catch {
    return 0;
  }
}

// Drops images whose checkout was abandoned more than a week ago.
export async function prunePendingImages() {
  const dir = pendingDir();
  let names: string[] = [];
  try {
    names = await fs.readdir(dir);
  } catch {
    return;
  }
  const cutoff = Date.now() - PENDING_TTL_MS;
  await Promise.all(
    names.map(async (name) => {
      const file = join(dir, name);
      const stat = await fs.stat(file).catch(() => null);
      if (stat && stat.mtimeMs < cutoff) await fs.rm(file, { force: true });
    })
  );
}

