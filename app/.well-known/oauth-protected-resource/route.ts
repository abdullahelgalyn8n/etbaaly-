import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 86400;

export const protectedResourceMetadata = {
  resource: "https://etbaaly.azagency.online",
  authorization_servers: ["https://etbaaly.azagency.online"],
  scopes_supported: ["openid", "profile", "email", "api:read", "api:write"],
  bearer_methods_supported: ["header"],
  resource_name: "إطبعلي | Etbaaly API",
  resource_documentation: "https://etbaaly.azagency.online/llms.txt",
  jwks_uri: "https://etbaaly.azagency.online/.well-known/jwks.json",
};

const headers: HeadersInit = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
  "Cloudflare-CDN-Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
};

export async function GET() {
  return new NextResponse(JSON.stringify(protectedResourceMetadata, null, 2), {
    status: 200,
    headers,
  });
}

export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers,
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
