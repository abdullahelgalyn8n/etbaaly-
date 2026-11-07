import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 86400;

const apiCatalog = {
  linkset: [
    {
      anchor: "https://etbaaly.azagency.online/api/products",
      "service-desc": [
        {
          href: "https://etbaaly.azagency.online/openapi.json",
          type: "application/json",
        },
      ],
      "service-doc": [
        {
          href: "https://etbaaly.azagency.online/llms.txt",
          type: "text/plain",
        },
      ],
      status: [
        {
          href: "https://etbaaly.azagency.online/api/health",
          type: "application/json",
        },
      ],
    },
    {
      anchor: "https://etbaaly.azagency.online/api/posts",
      "service-desc": [
        {
          href: "https://etbaaly.azagency.online/openapi.json",
          type: "application/json",
        },
      ],
      "service-doc": [
        {
          href: "https://etbaaly.azagency.online/llms.txt",
          type: "text/plain",
        },
      ],
      status: [
        {
          href: "https://etbaaly.azagency.online/api/health",
          type: "application/json",
        },
      ],
    },
    {
      anchor: "https://etbaaly.azagency.online/api/orders/track",
      "service-desc": [
        {
          href: "https://etbaaly.azagency.online/openapi.json",
          type: "application/json",
        },
      ],
      "service-doc": [
        {
          href: "https://etbaaly.azagency.online/track",
          type: "text/html",
        },
      ],
      status: [
        {
          href: "https://etbaaly.azagency.online/api/health",
          type: "application/json",
        },
      ],
    },
    {
      anchor: "https://etbaaly.azagency.online/api/quotes",
      "service-desc": [
        {
          href: "https://etbaaly.azagency.online/openapi.json",
          type: "application/json",
        },
      ],
      "service-doc": [
        {
          href: "https://etbaaly.azagency.online/llms.txt",
          type: "text/plain",
        },
      ],
      status: [
        {
          href: "https://etbaaly.azagency.online/api/health",
          type: "application/json",
        },
      ],
    },
    {
      anchor: "https://etbaaly.azagency.online/api/shipping",
      "service-desc": [
        {
          href: "https://etbaaly.azagency.online/openapi.json",
          type: "application/json",
        },
      ],
      "service-doc": [
        {
          href: "https://etbaaly.azagency.online/llms.txt",
          type: "text/plain",
        },
      ],
      status: [
        {
          href: "https://etbaaly.azagency.online/api/health",
          type: "application/json",
        },
      ],
    },
    {
      anchor: "https://etbaaly.azagency.online/api/health",
      "service-desc": [
        {
          href: "https://etbaaly.azagency.online/openapi.json",
          type: "application/json",
        },
      ],
      "service-doc": [
        {
          href: "https://etbaaly.azagency.online/llms.txt",
          type: "text/plain",
        },
      ],
      status: [
        {
          href: "https://etbaaly.azagency.online/api/health",
          type: "application/json",
        },
      ],
    },
    {
      anchor: "https://etbaaly.azagency.online/api/auth/token",
      "service-desc": [
        {
          href: "https://etbaaly.azagency.online/openapi.json",
          type: "application/json",
        },
      ],
      "service-doc": [
        {
          href: "https://etbaaly.azagency.online/.well-known/oauth-authorization-server",
          type: "application/json",
        },
      ],
      status: [
        {
          href: "https://etbaaly.azagency.online/api/health",
          type: "application/json",
        },
      ],
    },
    {
      anchor: "https://etbaaly.azagency.online/api/mcp",
      "service-desc": [
        {
          href: "https://etbaaly.azagency.online/.well-known/mcp/server-card.json",
          type: "application/json",
        },
      ],
      "service-doc": [
        {
          href: "https://etbaaly.azagency.online/llms.txt",
          type: "text/plain",
        },
      ],
      status: [
        {
          href: "https://etbaaly.azagency.online/api/health",
          type: "application/json",
        },
      ],
    },
    {
      anchor: "https://etbaaly.azagency.online/.well-known/poppy.json",
      "service-desc": [
        {
          href: "https://etbaaly.azagency.online/.well-known/poppy.json",
          type: "application/json",
        },
      ],
      "service-doc": [
        {
          href: "https://personalagentprotocol.org/docs/spec",
          type: "text/html",
        },
      ],
      status: [
        {
          href: "https://etbaaly.azagency.online/api/health",
          type: "application/json",
        },
      ],
    },
    {
      anchor: "https://etbaaly.azagency.online/api",
      "service-desc": [
        {
          href: "https://etbaaly.azagency.online/openapi.json",
          type: "application/json",
        },
      ],
      "service-doc": [
        {
          href: "https://docs.x402.org",
          type: "text/html",
        },
      ],
      status: [
        {
          href: "https://etbaaly.azagency.online/api/health",
          type: "application/json",
        },
      ],
    },
    {
      anchor: "https://etbaaly.azagency.online/.well-known/ucp",
      "service-desc": [
        {
          href: "https://etbaaly.azagency.online/.well-known/ucp",
          type: "application/json",
        },
      ],
      "service-doc": [
        {
          href: "https://ucp.dev/specification/overview/",
          type: "text/html",
        },
      ],
      status: [
        {
          href: "https://etbaaly.azagency.online/api/health",
          type: "application/json",
        },
      ],
    },
  ],
};

const catalogHeaders: HeadersInit = {
  "Content-Type": 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
  "Cloudflare-CDN-Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
  Link: '</openapi.json>; rel="service-desc", </llms.txt>; rel="describedby"',
};

export async function GET() {
  return new NextResponse(JSON.stringify(apiCatalog, null, 2), {
    status: 200,
    headers: catalogHeaders,
  });
}

export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: catalogHeaders,
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
