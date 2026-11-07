import { NextResponse } from "next/server";
import { oauthConfig } from "../oauth-authorization-server/route";

export const dynamic = "force-static";
export const revalidate = 86400;

export const oidcConfig = {
  ...oauthConfig,
  subject_types_supported: ["public"],
  id_token_signing_alg_values_supported: ["RS256", "HS256"],
  claims_supported: [
    "sub",
    "iss",
    "aud",
    "exp",
    "nbf",
    "iat",
    "email",
    "email_verified",
    "name",
    "role",
  ],
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
  return new NextResponse(JSON.stringify(oidcConfig, null, 2), {
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
    headers,
  });
}
