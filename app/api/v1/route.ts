import { NextRequest, NextResponse } from "next/server";
import { handleX402Request } from "@/lib/x402";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return handleX402Request(
    req,
    "https://etbaaly.azagency.online/api/v1",
    "Etbaaly AI agent commercial printing and packaging manufacturing API gateway v1"
  );
}

export async function POST(req: NextRequest) {
  return handleX402Request(
    req,
    "https://etbaaly.azagency.online/api/v1",
    "Etbaaly AI agent commercial printing and packaging manufacturing API gateway v1"
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, HEAD",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, payment-signature, PAYMENT-SIGNATURE, x-payment-signature",
      "Access-Control-Expose-Headers":
        "PAYMENT-REQUIRED, payment-required, WWW-Authenticate, PAYMENT-RESPONSE",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
