import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-static";
export const revalidate = 86400;

const authMdPath = path.resolve(process.cwd(), "public/auth.md");
let content = "";
try {
  content = fs.readFileSync(authMdPath, "utf-8");
} catch {
  content = `# auth.md\n\nYou are an agent. This service supports agentic registration.\n`;
}

export async function GET() {
  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "Cloudflare-CDN-Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      Link: '</.well-known/oauth-authorization-server>; rel="oauth-authorization-server", </.well-known/oauth-protected-resource>; rel="oauth-protected-resource"',
    },
  });
}

export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
