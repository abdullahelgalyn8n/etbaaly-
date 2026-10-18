import fs from "node:fs";
import path from "node:path";

const workerPath = path.resolve(".open-next/worker.js");

if (!fs.existsSync(workerPath)) {
  console.log("No .open-next/worker.js found to patch. Skipping.");
  process.exit(0);
}

let content = fs.readFileSync(workerPath, "utf-8");

if (content.includes("CF_EDGE_CACHE_ENABLED")) {
  console.log(".open-next/worker.js is already patched with Cloudflare Edge Cache.");
  process.exit(0);
}

const targetStr = `            // - \`Request\`s are handled by the Next server
            const reqOrResp = await middlewareHandler(request, env, ctx);
            if (reqOrResp instanceof Response) {
                return reqOrResp;
            }
            // @ts-expect-error: resolved by wrangler build
            const { handler } = await import("./server-functions/default/handler.mjs");
            return handler(reqOrResp, env, ctx, request.signal);`;

const replacement = `            // --- CF_EDGE_CACHE_ENABLED: Cloudflare Edge Cache for High Performance & Zero Resource Limit Exceeded ---
            const isGet = request.method === "GET";
            const pathname = url.pathname;
            const isBypassed =
                pathname.startsWith("/admin") ||
                pathname.startsWith("/api/admin") ||
                pathname.startsWith("/api/auth") ||
                pathname.startsWith("/dashboard") ||
                pathname.startsWith("/cart") ||
                request.headers.has("authorization") ||
                (request.headers.get("cookie") || "").includes("etbaaly_admin_token") ||
                url.searchParams.has("preview");

            const cache = (!isBypassed && isGet && typeof caches !== "undefined" && caches.default)
                ? caches.default
                : null;

            if (cache) {
                try {
                    const cacheKey = new Request(request.url, { method: "GET" });
                    const match = await cache.match(cacheKey);
                    if (match) {
                        const hitHeaders = new Headers(match.headers);
                        hitHeaders.set("CF-Worker-Cache", "HIT");
                        hitHeaders.set("X-Cache-Status", "HIT");
                        return new Response(match.body, {
                            status: match.status,
                            statusText: match.statusText,
                            headers: hitHeaders,
                        });
                    }
                } catch {
                    // Ignore cache lookup error and continue
                }
            }

            // - \`Request\`s are handled by the Next server
            const reqOrResp = await middlewareHandler(request, env, ctx);
            if (reqOrResp instanceof Response) {
                return reqOrResp;
            }
            // @ts-expect-error: resolved by wrangler build
            const { handler } = await import("./server-functions/default/handler.mjs");
            const serverResponse = await handler(reqOrResp, env, ctx, request.signal);

            if (cache && serverResponse && serverResponse.ok && serverResponse.status === 200) {
                try {
                    const cloned = serverResponse.clone();
                    const cacheHeaders = new Headers(cloned.headers);
                    const isApi = pathname.startsWith("/api/");
                    const ttl = isApi ? 600 : 86400;
                    cacheHeaders.set("Cache-Control", \`public, max-age=\${ttl}, s-maxage=\${ttl}, stale-while-revalidate=604800\`);
                    cacheHeaders.set("Cloudflare-CDN-Cache-Control", \`max-age=\${ttl}\`);
                    cacheHeaders.set("CF-Worker-Cache", "HIT");
                    cacheHeaders.set("X-Cache-Status", "HIT");

                    const toCache = new Response(cloned.body, {
                        status: cloned.status,
                        statusText: cloned.statusText,
                        headers: cacheHeaders,
                    });
                    const cacheKey = new Request(request.url, { method: "GET" });
                    if (ctx && typeof ctx.waitUntil === "function") {
                        ctx.waitUntil(cache.put(cacheKey, toCache));
                    } else {
                        await cache.put(cacheKey, toCache);
                    }
                } catch {
                    // Ignore cache put errors
                }
            }

            return serverResponse;`;

if (!content.includes(targetStr)) {
  console.error("Warning: target string not found in .open-next/worker.js for patching.");
  process.exit(1);
}

content = content.replace(targetStr, replacement);
fs.writeFileSync(workerPath, content, "utf-8");
console.log("Successfully patched .open-next/worker.js with Cloudflare Edge Cache!");
