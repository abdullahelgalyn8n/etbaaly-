import { NextRequest, NextResponse } from "next/server";
import mcpData from "@/public/.well-known/mcp/server-card.json";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, method } = body || {};

    if (method === "initialize") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: mcpData.capabilities,
          serverInfo: mcpData.serverInfo,
        },
      });
    }

    if (method === "tools/list") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          tools: mcpData.tools || [],
        },
      });
    }

    if (method === "ping") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {},
      });
    }

    return NextResponse.json({
      jsonrpc: "2.0",
      id,
      error: {
        code: -32601,
        message: `Method '${method}' not found. Supported methods: initialize, tools/list, ping.`,
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: {
          code: -32700,
          message: "Parse error: Invalid JSON payload.",
        },
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      name: mcpData.name,
      version: mcpData.version,
      transport: "streamable-http",
      endpoint: "https://etbaaly.azagency.online/api/mcp",
      serverCard: "https://etbaaly.azagency.online/.well-known/mcp/server-card.json",
      capabilities: mcpData.capabilities,
      tools: mcpData.tools,
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
