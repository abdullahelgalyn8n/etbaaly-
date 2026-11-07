import fs from "node:fs";
import path from "node:path";

const workerPath = path.resolve(".open-next/worker.js");
const authMdPath = path.resolve("public/auth.md");
const authMdContent = fs.existsSync(authMdPath) ? fs.readFileSync(authMdPath, "utf-8") : "# auth.md\n";
const poppyPath = path.resolve("public/.well-known/poppy.json");
const poppyContent = fs.existsSync(poppyPath) ? fs.readFileSync(poppyPath, "utf-8") : "{}";
const x402Path = path.resolve("public/.well-known/x402.json");
const x402Content = fs.existsSync(x402Path) ? fs.readFileSync(x402Path, "utf-8") : "{}";
const ucpPath = path.resolve("public/.well-known/ucp.json");
const ucpContent = fs.existsSync(ucpPath) ? fs.readFileSync(ucpPath, "utf-8") : "{}";
const acpPath = path.resolve("public/.well-known/acp.json");
const acpContent = fs.existsSync(acpPath) ? fs.readFileSync(acpPath, "utf-8") : "{}";

if (!fs.existsSync(workerPath)) {
  console.log("No .open-next/worker.js found to patch. Skipping.");
  process.exit(0);
}

// Copy markdown converter to .open-next/markdown.mjs
const markdownConverterSource = path.resolve("scripts/markdown-converter.mjs");
const markdownConverterDest = path.resolve(".open-next/markdown.mjs");
if (fs.existsSync(markdownConverterSource)) {
  fs.copyFileSync(markdownConverterSource, markdownConverterDest);
  console.log("Successfully copied scripts/markdown-converter.mjs to .open-next/markdown.mjs!");
}

function dedupeNextEnv() {
  const nextEnvPath = path.resolve(".open-next/cloudflare/next-env.mjs");
  if (fs.existsSync(nextEnvPath)) {
    const envContent = fs.readFileSync(nextEnvPath, "utf-8");
    const lines = envContent.split("\n");
    const seen = new Set();
    const deduped = [];
    for (const line of lines) {
      const match = line.match(/^export const (\w+)/);
      if (match) {
        const varName = match[1];
        if (seen.has(varName)) continue;
        seen.add(varName);
      }
      deduped.push(line);
    }
    fs.writeFileSync(nextEnvPath, deduped.join("\n"), "utf-8");
    console.log("Successfully validated and deduped .open-next/cloudflare/next-env.mjs!");
  }
}

dedupeNextEnv();

let buildId = "v1";
const buildIdPath = path.resolve(".open-next/assets/BUILD_ID");
if (fs.existsSync(buildIdPath)) {
  buildId = fs.readFileSync(buildIdPath, "utf-8").trim();
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
            if (pathname === "/auth.md" || pathname === "/auth.md/") {
                return new Response(${JSON.stringify(authMdContent)}, {
                    status: 200,
                    headers: {
                        "Content-Type": "text/markdown; charset=utf-8",
                        "Access-Control-Allow-Origin": "*",
                        "Cache-Control": "public, max-age=3600, s-maxage=86400",
                        "Link": '</.well-known/oauth-authorization-server>; rel="oauth-authorization-server", </.well-known/oauth-protected-resource>; rel="oauth-protected-resource", </.well-known/mcp/server-card.json>; rel="service-desc", </.well-known/agent-skills/index.json>; rel="service-desc", </.well-known/poppy.json>; rel="service-desc"',
                    },
                });
            }
            if (pathname === "/.well-known/poppy.json" || pathname === "/.well-known/poppy.json/" || pathname === "/.well-known/poppy" || pathname === "/.well-known/poppy/") {
                return new Response(${JSON.stringify(poppyContent)}, {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Access-Control-Allow-Origin": "*",
                        "Cache-Control": "public, max-age=3600, s-maxage=86400",
                    },
                });
            }
            if (pathname === "/.well-known/x402.json" || pathname === "/.well-known/x402.json/" || pathname === "/.well-known/x402" || pathname === "/.well-known/x402/") {
                return new Response(${JSON.stringify(x402Content)}, {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Access-Control-Allow-Origin": "*",
                        "Cache-Control": "public, max-age=3600, s-maxage=86400",
                    },
                });
            }
            if (pathname === "/.well-known/ucp" || pathname === "/.well-known/ucp/" || pathname === "/.well-known/ucp.json" || pathname === "/.well-known/ucp.json/") {
                return new Response(${JSON.stringify(ucpContent)}, {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Access-Control-Allow-Origin": "*",
                        "Cache-Control": "public, max-age=3600, s-maxage=86400",
                    },
                });
            }
            if (pathname === "/.well-known/acp.json" || pathname === "/.well-known/acp.json/" || pathname === "/.well-known/acp" || pathname === "/.well-known/acp/") {
                return new Response(${JSON.stringify(acpContent)}, {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Access-Control-Allow-Origin": "*",
                        "Cache-Control": "public, max-age=3600, s-maxage=86400",
                    },
                });
            }
            if (pathname === "/api" || pathname === "/api/" || pathname === "/api/v1" || pathname === "/api/v1/") {
                const paymentSig = request.headers.get("payment-signature") || request.headers.get("PAYMENT-SIGNATURE") || request.headers.get("x-payment-signature");
                if (!paymentSig) {
                    const x402Payload = {
                        x402Version: 2,
                        error: "PAYMENT-SIGNATURE header is required",
                        resource: {
                            url: "https://etbaaly.azagency.online" + pathname,
                            description: "Etbaaly AI agent commercial printing and packaging manufacturing API gateway",
                            mimeType: "application/json"
                        },
                        accepts: [
                            {
                                scheme: "exact",
                                network: "eip155:8453",
                                amount: "10000",
                                asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
                                payTo: "0x0113c23eF5d3269F39b03F80905e32B945398d5a",
                                maxTimeoutSeconds: 60,
                                price: "$0.01",
                                maxAmountRequired: "10000",
                                resource: "https://etbaaly.azagency.online" + pathname,
                                description: "Etbaaly AI agent commercial printing and packaging manufacturing API gateway",
                                token: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
                                facilitator: "https://api.cdp.coinbase.com/platform/v2/x402"
                            }
                        ]
                    };
                    const base64Payload = btoa(JSON.stringify(x402Payload));
                    return new Response(JSON.stringify(x402Payload, null, 2), {
                        status: 402,
                        statusText: "Payment Required",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, HEAD",
                            "Access-Control-Allow-Headers": "Content-Type, Authorization, payment-signature, PAYMENT-SIGNATURE, x-payment-signature",
                            "Access-Control-Expose-Headers": "PAYMENT-REQUIRED, payment-required, WWW-Authenticate, PAYMENT-RESPONSE",
                            "PAYMENT-REQUIRED": base64Payload,
                            "WWW-Authenticate": "x402",
                            "Cache-Control": "no-store",
                        }
                    });
                }
            }
            const isBypassed =
                pathname.startsWith("/admin") ||
                pathname.startsWith("/api/admin") ||
                pathname.startsWith("/api/auth") ||
                pathname.startsWith("/api/orders") ||
                request.headers.has("authorization") ||
                (request.headers.get("cookie") || "").includes("etbaaly_admin_token") ||
                url.searchParams.has("preview");

            const cache = (!isBypassed && isGet && typeof caches !== "undefined" && caches.default)
                ? caches.default
                : null;

            const isRsc = request.headers.get("rsc") === "1" || url.searchParams.has("_rsc");
            const isMarkdown = (request.headers.get("accept") || "").includes("text/markdown");

            const BUILD_ID = "${buildId}";
            const cacheKeyUrl = new URL(request.url);
            cacheKeyUrl.searchParams.delete("_rsc");
            cacheKeyUrl.searchParams.set("__cf_bid", BUILD_ID);
            if (isRsc) {
                cacheKeyUrl.searchParams.set("__cf_rsc", "1");
            } else {
                cacheKeyUrl.searchParams.delete("__cf_rsc");
            }
            if (isMarkdown) {
                cacheKeyUrl.searchParams.set("__cf_md", "1");
            } else {
                cacheKeyUrl.searchParams.delete("__cf_md");
            }
            const cacheKey = new Request(cacheKeyUrl.toString(), { method: "GET" });

            if (cache) {
                try {
                    const match = await cache.match(cacheKey);
                    if (match) {
                        const hitHeaders = new Headers(match.headers);
                        hitHeaders.set("CF-Worker-Cache", "HIT");
                        hitHeaders.set("X-Cache-Status", "HIT");
                        if ((pathname === "/" || pathname === "") && !hitHeaders.has("Link")) {
                            hitHeaders.set("Link", '</.well-known/api-catalog>; rel="api-catalog", </llms.txt>; rel="describedby", </openapi.json>; rel="service-desc", </.well-known/oauth-authorization-server>; rel="oauth-authorization-server", </.well-known/oauth-protected-resource>; rel="oauth-protected-resource", </.well-known/mcp/server-card.json>; rel="service-desc", </.well-known/agent-skills/index.json>; rel="service-desc", </.well-known/poppy.json>; rel="service-desc"');
                        }
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
            // Normalize API URLs with missing trailing slash for Next.js trailingSlash: true
            let effectiveReq = reqOrResp;
            if (effectiveReq instanceof Request) {
                const reqUrl = new URL(effectiveReq.url);
                if (reqUrl.pathname.startsWith("/api/") && !reqUrl.pathname.endsWith("/")) {
                    reqUrl.pathname = \`\${reqUrl.pathname}/\`;
                    effectiveReq = new Request(reqUrl.toString(), effectiveReq);
                }
            }
            // @ts-expect-error: resolved by wrangler build
            const { handler } = await import("./server-functions/default/handler.mjs");
            const serverResponse = await handler(effectiveReq, env, ctx, request.signal);

            if (isMarkdown && serverResponse && serverResponse.ok && (serverResponse.headers.get("content-type") || "").includes("text/html")) {
                try {
                    // @ts-expect-error: resolved by wrangler build
                    const { htmlToMarkdown } = await import("./markdown.mjs");
                    const html = await serverResponse.text();
                    const markdown = htmlToMarkdown(html);
                    const tokens = Math.ceil(markdown.length / 4);

                    const mdHeaders = new Headers(serverResponse.headers);
                    mdHeaders.set("Content-Type", "text/markdown; charset=utf-8");
                    mdHeaders.set("Vary", "Accept, Accept-Encoding");
                    mdHeaders.set("x-markdown-tokens", String(tokens));
                    mdHeaders.set("Content-Signal", "ai-train=yes, search=yes, ai-input=yes");
                    mdHeaders.set("Link", '</.well-known/api-catalog>; rel="api-catalog", </llms.txt>; rel="describedby", </openapi.json>; rel="service-desc", </.well-known/oauth-authorization-server>; rel="oauth-authorization-server", </.well-known/oauth-protected-resource>; rel="oauth-protected-resource", </.well-known/mcp/server-card.json>; rel="service-desc", </.well-known/agent-skills/index.json>; rel="service-desc", </.well-known/poppy.json>; rel="service-desc"');
                    mdHeaders.delete("Content-Encoding");
                    mdHeaders.delete("Content-Length");
                    mdHeaders.delete("ETag");

                    const isApi = pathname.startsWith("/api/");
                    const browserMaxAge = isApi ? 60 : 3600;
                    const edgeMaxAge = isApi ? 600 : 86400;
                    mdHeaders.set("Cache-Control", \`public, max-age=\${browserMaxAge}, s-maxage=\${edgeMaxAge}, must-revalidate\`);
                    mdHeaders.set("Cloudflare-CDN-Cache-Control", \`max-age=\${edgeMaxAge}\`);
                    mdHeaders.set("CF-Worker-Cache", "HIT");
                    mdHeaders.set("X-Cache-Status", "HIT");

                    const mdResponse = new Response(markdown, {
                        status: serverResponse.status,
                        statusText: serverResponse.statusText,
                        headers: mdHeaders,
                    });

                    if (cache) {
                        try {
                            const toCache = mdResponse.clone();
                            if (ctx && typeof ctx.waitUntil === "function") {
                                ctx.waitUntil(cache.put(cacheKey, toCache));
                            } else {
                                await cache.put(cacheKey, toCache);
                            }
                        } catch {
                            // Ignore cache put errors
                        }
                    }

                    return mdResponse;
                } catch {
                    // Ignore conversion error and fall back to normal response
                }
            }

            if (cache && serverResponse && serverResponse.ok && serverResponse.status === 200) {
                try {
                    const cloned = serverResponse.clone();
                    const cacheHeaders = new Headers(cloned.headers);
                    // Cloudflare Cache API: remove Vary so cache.match(cacheKey) matches reliably
                    cacheHeaders.delete("Vary");
                    cacheHeaders.set("Vary", "Accept, Accept-Encoding");

                    const isApi = pathname.startsWith("/api/");
                    const browserMaxAge = isApi ? 60 : (isRsc ? 300 : 3600);
                    const edgeMaxAge = isApi ? 600 : 86400;
                    cacheHeaders.set("Cache-Control", \`public, max-age=\${browserMaxAge}, s-maxage=\${edgeMaxAge}, must-revalidate\`);
                    cacheHeaders.set("Cloudflare-CDN-Cache-Control", \`max-age=\${edgeMaxAge}\`);
                    cacheHeaders.set("CF-Worker-Cache", "HIT");
                    cacheHeaders.set("X-Cache-Status", "HIT");

                    const toCache = new Response(cloned.body, {
                        status: cloned.status,
                        statusText: cloned.statusText,
                        headers: cacheHeaders,
                    });
                    if (ctx && typeof ctx.waitUntil === "function") {
                        ctx.waitUntil(cache.put(cacheKey, toCache));
                    } else {
                        await cache.put(cacheKey, toCache);
                    }
                } catch {
                    // Ignore cache put errors
                }
            }

            if ((pathname === "/" || pathname === "") && !serverResponse.headers.has("Link")) {
                const finalHeaders = new Headers(serverResponse.headers);
                finalHeaders.set("Link", '</.well-known/api-catalog>; rel="api-catalog", </llms.txt>; rel="describedby", </openapi.json>; rel="service-desc", </.well-known/oauth-authorization-server>; rel="oauth-authorization-server", </.well-known/oauth-protected-resource>; rel="oauth-protected-resource", </.well-known/mcp/server-card.json>; rel="service-desc", </.well-known/agent-skills/index.json>; rel="service-desc", </.well-known/poppy.json>; rel="service-desc"');
                finalHeaders.set("Vary", "Accept, Accept-Encoding");
                return new Response(serverResponse.body, {
                    status: serverResponse.status,
                    statusText: serverResponse.statusText,
                    headers: finalHeaders,
                });
            }

            return serverResponse;`;

if (!content.includes(targetStr)) {
  console.error("Warning: target string not found in .open-next/worker.js for patching.");
  process.exit(1);
}

content = content.replace(targetStr, replacement);
fs.writeFileSync(workerPath, content, "utf-8");
console.log("Successfully patched .open-next/worker.js with Cloudflare Edge Cache and Markdown for Agents!");

// Fix duplicate exports in .open-next/cloudflare/next-env.mjs if generated by OpenNext
const nextEnvPath = path.resolve(".open-next/cloudflare/next-env.mjs");
if (fs.existsSync(nextEnvPath)) {
  const envContent = fs.readFileSync(nextEnvPath, "utf-8");
  const lines = envContent.split("\n");
  const seen = new Set();
  const deduped = [];
  for (const line of lines) {
    const match = line.match(/^export const (\w+)/);
    if (match) {
      const varName = match[1];
      if (seen.has(varName)) continue;
      seen.add(varName);
    }
    deduped.push(line);
  }
  fs.writeFileSync(nextEnvPath, deduped.join("\n"), "utf-8");
  console.log("Successfully validated and deduped .open-next/cloudflare/next-env.mjs!");
}
