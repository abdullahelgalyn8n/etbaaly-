import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact, website, magnetTitle, categoryTag, sourceArticle } = body;

    // Optional forwarding to n8n webhook if configured
    const n8nWebhook = process.env.N8N_LEAD_WEBHOOK_URL;
    if (n8nWebhook) {
      try {
        await fetch(n8nWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            contact,
            website,
            magnetTitle,
            categoryTag,
            sourceArticle,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.error("n8n webhook forward error:", err);
      }
    }

    return NextResponse.json({ success: true, message: "Lead captured successfully" });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}
