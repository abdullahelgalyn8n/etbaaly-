import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 86400;

export const oauthConfig = {
  issuer: "https://etbaaly.azagency.online",
  authorization_endpoint: "https://etbaaly.azagency.online/login",
  token_endpoint: "https://etbaaly.azagency.online/api/auth/token",
  userinfo_endpoint: "https://etbaaly.azagency.online/api/auth/session",
  revocation_endpoint: "https://etbaaly.azagency.online/api/auth/logout",
  jwks_uri: "https://etbaaly.azagency.online/.well-known/jwks.json",
  registration_endpoint: "https://etbaaly.azagency.online/register",
  scopes_supported: ["openid", "profile", "email", "api:read", "api:write"],
  response_types_supported: ["code", "token", "id_token"],
  response_modes_supported: ["query", "fragment"],
  grant_types_supported: [
    "authorization_code",
    "client_credentials",
    "refresh_token",
  ],
  token_endpoint_auth_methods_supported: [
    "client_secret_basic",
    "client_secret_post",
    "none",
  ],
  token_endpoint_auth_signing_alg_values_supported: ["RS256", "HS256"],
  code_challenge_methods_supported: ["S256"],
  service_documentation: "https://etbaaly.azagency.online/llms.txt",
  ui_locales_supported: ["ar", "en"],
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
  return new NextResponse(JSON.stringify(oauthConfig, null, 2), {
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
