import { NextResponse } from "next/server";
import mcpData from "@/public/.well-known/mcp/server-card.json";

export const dynamic = "force-static";
export const revalidate = 86400;

const headers: HeadersInit = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
  "Cloudflare-CDN-Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
};

export async function GET() {
  return new NextResponse(JSON.stringify(mcpData, null, 2), {
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
