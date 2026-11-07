import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    let contentType = request.headers.get("content-type") || "";
    let grantType = "";
    let clientId = "";
    let clientSecret = "";
    let scope = "api:read";

    // Handle Authorization Basic header
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Basic ")) {
      try {
        const decoded = atob(authHeader.substring(6));
        const [id, secret] = decoded.split(":");
        clientId = id;
        clientSecret = secret;
      } catch {
        // Ignore decode error
      }
    }

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      grantType = (formData.get("grant_type") as string) || "";
      if (!clientId) clientId = (formData.get("client_id") as string) || "";
      if (!clientSecret) clientSecret = (formData.get("client_secret") as string) || "";
      if (formData.has("scope")) scope = formData.get("scope") as string;
    } else if (contentType.includes("application/json")) {
      const body = await request.json();
      grantType = body.grant_type || "";
      if (!clientId) clientId = body.client_id || "";
      if (!clientSecret) clientSecret = body.client_secret || "";
      if (body.scope) scope = body.scope;
    }

    if (!grantType) {
      return NextResponse.json(
        {
          error: "invalid_request",
          error_description: "Missing grant_type parameter.",
        },
        { status: 400 }
      );
    }

    if (grantType !== "client_credentials" && grantType !== "authorization_code" && grantType !== "refresh_token") {
      return NextResponse.json(
        {
          error: "unsupported_grant_type",
          error_description: `Grant type '${grantType}' is not supported.`,
        },
        { status: 400 }
      );
    }

    // Generate token
    const token = `etbaaly_tok_${Math.random().toString(36).substring(2)}_${Date.now().toString(36)}`;

    return NextResponse.json(
      {
        access_token: token,
        token_type: "Bearer",
        expires_in: 3600,
        scope: scope || "api:read",
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
          Pragma: "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: "server_error",
        error_description: "Internal server error during token issuance.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      error: "invalid_request",
      error_description: "The token endpoint requires HTTP POST with client credentials or authorization code.",
    },
    {
      status: 405,
      headers: {
        Allow: "POST, OPTIONS",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
