import fs from "node:fs";
import path from "node:path";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const HOST = "etbaaly.azagency.online";
const KEY = "5130d11c24be033d5bc6c3db1db1496b";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const BATCH_LIMIT = 10000;

const LOCAL_KEY_PATHS = [
  path.resolve(`public/${KEY}.txt`),
  path.resolve(`.open-next/assets/${KEY}.txt`),
];
const LOCAL_SITEMAP_CANDIDATES = [
  path.resolve(".next/server/app/sitemap.xml.body"),
  path.resolve(".open-next/server-functions/default/.next/server/app/sitemap.xml.body"),
  path.resolve("public/sitemap.xml"),
];

/**
 * Parse CLI arguments for dry-run mode, live sitemap override, or explicit URLs.
 */
function parseArgs(argv) {
  const options = { dryRun: false, liveSitemap: false, explicitUrls: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--live-sitemap") options.liveSitemap = true;
    else if (arg === "--url" && argv[i + 1]) {
      options.explicitUrls.push(argv[i + 1]);
      i += 1;
    }
  }
  return options;
}

/**
 * Extract valid same-host URLs from sitemap XML content.
 */
function extractUrlsFromSitemapXml(xml) {
  const urls = new Set();
  for (const match of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)) {
    const candidate = match[1].trim();
    try {
      const parsed = new URL(candidate);
      if (parsed.hostname === HOST && parsed.protocol === "https:") {
        urls.add(parsed.toString());
      }
    } catch {
      // Skip malformed XML entries
    }
  }
  return [...urls];
}

/**
 * Resolve target URLs from CLI args, local sitemap build output, or live HTTPS sitemap.
 */
async function loadTargetUrls(options) {
  if (options.explicitUrls.length > 0) {
    return [...new Set(options.explicitUrls.filter((u) => new URL(u).hostname === HOST))];
  }

  if (!options.liveSitemap) {
    for (const candidate of LOCAL_SITEMAP_CANDIDATES) {
      if (fs.existsSync(candidate)) {
        const xml = fs.readFileSync(candidate, "utf8");
        const urls = extractUrlsFromSitemapXml(xml);
        if (urls.length > 0) return urls;
      }
    }
  }

  const liveSitemapUrl = `https://${HOST}/sitemap.xml`;
  const res = await fetch(liveSitemapUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap from ${liveSitemapUrl}: HTTP ${res.status}`);
  }
  const xml = await res.text();
  return extractUrlsFromSitemapXml(xml);
}

/**
 * Confirm the IndexNow verification key file is live over HTTPS before submitting.
 */
async function verifyLiveKeyFile() {
  const res = await fetch(KEY_LOCATION, {
    headers: { "Cache-Control": "no-cache" },
  });
  if (!res.ok) {
    throw new Error(
      `Verification key file not reachable at ${KEY_LOCATION} (HTTP ${res.status}). Deploy the updated worker before running live IndexNow submission.`
    );
  }
  const body = (await res.text()).trim();
  if (body !== KEY) {
    throw new Error(
      `Verification key mismatch at ${KEY_LOCATION}. Expected "${KEY}", got "${body.slice(0, 64)}".`
    );
  }
}

async function submitBatch(urlList) {
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });
  const text = await res.text();
  if (res.status !== 200 && res.status !== 202) {
    throw new Error(`IndexNow rejected batch (HTTP ${res.status}): ${text}`);
  }
  return { status: res.status, submitted: urlList.length };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const localKeyPresent = LOCAL_KEY_PATHS.some((p) => fs.existsSync(p));
  if (!localKeyPresent) {
    throw new Error(`Missing local IndexNow key file at public/${KEY}.txt`);
  }

  const urls = await loadTargetUrls(options);
  if (urls.length === 0) {
    throw new Error("No target URLs found to submit to IndexNow.");
  }

  console.log(`Host: ${HOST}`);
  console.log(`Key location: ${KEY_LOCATION}`);
  console.log(`Total URLs queued: ${urls.length}`);

  if (options.dryRun) {
    console.log("Dry run complete. Sample URLs:", urls.slice(0, 5));
    return;
  }

  await verifyLiveKeyFile();
  for (let i = 0; i < urls.length; i += BATCH_LIMIT) {
    const batch = urls.slice(i, i + BATCH_LIMIT);
    const result = await submitBatch(batch);
    console.log(`Batch ${i / BATCH_LIMIT + 1}: HTTP ${result.status} (${result.submitted} URLs accepted)`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
