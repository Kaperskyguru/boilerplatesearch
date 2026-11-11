import { paymentConfig } from "./config";

async function gh(path: string, init: { method?: string; body?: unknown } = {}) {
  const { githubToken, githubRepo } = paymentConfig();
  if (!githubToken) throw new Error("GITHUB_TOKEN is not set");
  const res = await fetch(`https://api.github.com/repos/${githubRepo}${path}`, {
    method: init.method || "GET",
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "boilerplatesearch-submissions",
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
  });
  return res;
}

async function ghJson(path: string, init: { method?: string; body?: unknown } = {}) {
  const res = await gh(path, init);
  const json: any = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err: any = new Error(`GitHub ${init.method || "GET"} ${path} failed (${res.status}): ${json?.message || res.statusText}`);
    err.githubStatus = res.status;
    throw err;
  }
  return json;
}

// Returns the UTF-8 text of a file on the configured branch, or null if absent.
export async function readRepoFile(path: string): Promise<string | null> {
  const { githubBranch } = paymentConfig();
  const res = await gh(`/contents/${encodeURI(path)}?ref=${encodeURIComponent(githubBranch)}`);
  if (res.status === 404) return null;
  const json: any = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`GitHub read ${path} failed (${res.status}): ${json?.message || res.statusText}`);
  return Buffer.from(json.content || "", "base64").toString("utf8");
}

export async function repoFileExists(path: string): Promise<boolean> {
  const { githubBranch } = paymentConfig();
  const res = await gh(`/contents/${encodeURI(path)}?ref=${encodeURIComponent(githubBranch)}`, { method: "HEAD" });
  if (res.status === 404) return false;
  if (!res.ok) throw new Error(`GitHub check ${path} failed (${res.status})`);
  return true;
}

// Writes all files in ONE commit on the configured branch (one redeploy, never
// a half-added listing). If the branch moved meanwhile, the fast-forward update
// fails and we throw: the webhook then returns 500, Lemon Squeezy retries, and
// the retry re-checks the slug against the new tip instead of overwriting it.
export async function commitFiles(
  files: { path: string; content: Buffer }[],
  message: string
): Promise<string> {
  const { githubBranch } = paymentConfig();
  const ref = await ghJson(`/git/ref/heads/${encodeURIComponent(githubBranch)}`);
  const parentSha: string = ref.object.sha;
  const parent = await ghJson(`/git/commits/${parentSha}`);

  const tree = [];
  for (const file of files) {
    const blob = await ghJson("/git/blobs", {
      method: "POST",
      body: { content: file.content.toString("base64"), encoding: "base64" },
    });
    tree.push({ path: file.path, mode: "100644", type: "blob", sha: blob.sha });
  }
  const newTree = await ghJson("/git/trees", {
    method: "POST",
    body: { base_tree: parent.tree.sha, tree },
  });
  const commit = await ghJson("/git/commits", {
    method: "POST",
    body: { message, tree: newTree.sha, parents: [parentSha] },
  });
  await ghJson(`/git/refs/heads/${encodeURIComponent(githubBranch)}`, {
    method: "PATCH",
    body: { sha: commit.sha, force: false },
  });
  return commit.sha;
}
