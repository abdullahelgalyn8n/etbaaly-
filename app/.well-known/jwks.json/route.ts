import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 86400;

export const jwksData = {
  keys: [
    {
      kty: "RSA",
      use: "sig",
      alg: "RS256",
      kid: "etbaaly-default-key-1",
      n: "sX1_Wz2y7T_8v3qF-9w5B3jR7uL_1mP6tK4nQ8xV0aY2zE5hT8gN7jM4vC1bX3zA6dF9gH2jK5lP8sV1wZ4yB7eT0rW3uI6oP9aS2dF5gH8jK1lM4vC7bX0zA3dE6fG9hJ2kL5nQ8rU1vX4yA7bC0dE3fG6hI9jK2lM5oP8rS1uV4wX7z",
      e: "AQAB",
    },
  ],
};

const headers: HeadersInit = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
  "Cloudflare-CDN-Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
};

export async function GET() {
  return new NextResponse(JSON.stringify(jwksData, null, 2), {
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
