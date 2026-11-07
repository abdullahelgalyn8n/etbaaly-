import { NextResponse } from "next/server";
import openApiData from "@/public/openapi.json";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function GET() {
  return NextResponse.json(openApiData, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "Cloudflare-CDN-Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
