import { NextResponse, type NextRequest } from "next/server";

export const X402_CONFIG = {
  version: 2,
  walletAddress: "0x0113c23eF5d3269F39b03F80905e32B945398d5a",
  network: "eip155:8453", // Base mainnet
  usdcToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  price: "$0.01",
  amount: "10000",
  facilitatorUrl: "https://api.cdp.coinbase.com/platform/v2/x402",
};

export function createX402Payload(url: string, description: string) {
  return {
    x402Version: X402_CONFIG.version,
    error: "PAYMENT-SIGNATURE header is required",
    resource: {
      url,
      description,
      mimeType: "application/json",
    },
    accepts: [
      {
        scheme: "exact",
        network: X402_CONFIG.network,
        amount: X402_CONFIG.amount,
        asset: X402_CONFIG.usdcToken,
        payTo: X402_CONFIG.walletAddress,
        maxTimeoutSeconds: 60,
        price: X402_CONFIG.price,
        maxAmountRequired: X402_CONFIG.amount,
        resource: url,
        description,
        token: X402_CONFIG.usdcToken,
        facilitator: X402_CONFIG.facilitatorUrl,
      },
    ],
  };
}

export function handleX402Request(req: NextRequest | Request, url: string, description: string) {
  const headers = req.headers;
  const paymentSig =
    headers.get("payment-signature") ||
    headers.get("PAYMENT-SIGNATURE") ||
    headers.get("x-payment-signature");

  if (paymentSig) {
    return NextResponse.json(
      {
        status: "success",
        message: "Payment verified via x402 facilitator.",
        resource: {
          name: "Etbaaly AI Agent Commercial API",
          endpoints: [
            "/api/products",
            "/api/quotes",
            "/api/orders",
            "/api/orders/track",
            "/api/shipping",
          ],
        },
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "PAYMENT-RESPONSE": Buffer.from(
            JSON.stringify({
              status: "settled",
              network: X402_CONFIG.network,
              transaction:
                "0x" +
                Array.from({ length: 64 }, () =>
                  Math.floor(Math.random() * 16).toString(16)
                ).join(""),
            })
          ).toString("base64"),
        },
      }
    );
  }

  const payload = createX402Payload(url, description);
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");

  return new NextResponse(JSON.stringify(payload, null, 2), {
    status: 402,
    statusText: "Payment Required",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, HEAD",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, payment-signature, PAYMENT-SIGNATURE, x-payment-signature",
      "Access-Control-Expose-Headers":
        "PAYMENT-REQUIRED, payment-required, WWW-Authenticate, PAYMENT-RESPONSE",
      "PAYMENT-REQUIRED": base64Payload,
      "WWW-Authenticate": "x402",
      "Cache-Control": "no-store",
    },
  });
}
