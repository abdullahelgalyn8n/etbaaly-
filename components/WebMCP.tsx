"use client";

import { useEffect } from "react";

export function WebMCP() {
  useEffect(() => {
    function registerWebMCPTools() {
      const mc =
        (typeof document !== "undefined" && (document as any).modelContext)
          ? (document as any).modelContext
          : (typeof navigator !== "undefined" && (navigator as any).modelContext)
            ? (navigator as any).modelContext
            : null;

      if (!mc || typeof mc.registerTool !== "function") return;

      const tools = [
        {
          name: "search-products",
          description: "Search products in the Etbaaly printing and packaging catalog.",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search keyword (e.g. packaging boxes, business cards, stickers, hoodies).",
              },
              category: {
                type: "string",
                description: "Category filter (packaging-boxes, offset-commercial, corporate-stationery, apparel).",
              },
            },
          },
          execute: async (params: { query?: string; category?: string }) => {
            const query = params?.query || "";
            const category = params?.category || "";
            try {
              const res = await fetch(
                `/api/products${category ? `?category=${encodeURIComponent(category)}` : ""}`
              );
              const data = await res.json();
              return { content: [{ type: "text", text: JSON.stringify(data) }] };
            } catch (err) {
              return { isError: true, content: [{ type: "text", text: String(err) }] };
            }
          },
        },
        {
          name: "track-order",
          description: "Track custom printing runs, packaging manufacturing, and shipping delivery status by tracking code.",
          inputSchema: {
            type: "object",
            required: ["trackingCode"],
            properties: {
              trackingCode: {
                type: "string",
                description: "Order tracking number (e.g. ETB-12345 or DEMO-BOX).",
              },
            },
          },
          execute: async (params: { trackingCode: string }) => {
            const code = params?.trackingCode || "";
            try {
              const res = await fetch(`/api/orders/track?trackingCode=${encodeURIComponent(code)}`);
              const data = await res.json();
              return { content: [{ type: "text", text: JSON.stringify(data) }] };
            } catch (err) {
              return { isError: true, content: [{ type: "text", text: String(err) }] };
            }
          },
        },
        {
          name: "request-quote",
          description: "Request a custom packaging manufacturing estimate or offset printing quotation.",
          inputSchema: {
            type: "object",
            required: ["name", "phone", "serviceType"],
            properties: {
              name: { type: "string", description: "Customer name" },
              phone: { type: "string", description: "WhatsApp or phone number" },
              serviceType: { type: "string", description: "Type of service or packaging box" },
              quantity: { type: "number", description: "Desired production quantity" },
              specifications: { type: "string", description: "Custom dimensions, paper type, or finishes" },
            },
          },
          execute: async (params: Record<string, unknown>) => {
            try {
              const res = await fetch("/api/quotes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(params),
              });
              const data = await res.json();
              return { content: [{ type: "text", text: JSON.stringify(data) }] };
            } catch (err) {
              return { isError: true, content: [{ type: "text", text: String(err) }] };
            }
          },
        },
        {
          name: "calculate-shipping",
          description: "Calculate domestic shipping delivery time and fees across Egyptian governorates.",
          inputSchema: {
            type: "object",
            required: ["governorate"],
            properties: {
              governorate: { type: "string", description: "Egyptian governorate name (e.g. Cairo, Giza, Alexandria)." },
            },
          },
          execute: async (params: { governorate: string }) => {
            const gov = params?.governorate || "";
            try {
              const res = await fetch(`/api/shipping?governorate=${encodeURIComponent(gov)}`);
              const data = await res.json();
              return { content: [{ type: "text", text: JSON.stringify(data) }] };
            } catch (err) {
              return { isError: true, content: [{ type: "text", text: String(err) }] };
            }
          },
        },
      ];

      const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
      const signal = controller ? controller.signal : undefined;

      for (const tool of tools) {
        try {
          const promise = mc.registerTool(tool, { signal });
          if (promise && typeof promise.catch === "function") {
            promise.catch(() => {});
          }
        } catch {
          // Ignore registration errors
        }
      }

      return () => {
        if (controller) {
          controller.abort();
        }
      };
    }

    const cleanup = registerWebMCPTools();
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, []);

  return (
    <>
      {/* Declarative WebMCP Order Tracker Form */}
      <form
        action="/track"
        method="GET"
        toolname="track-order"
        tooldescription="Track custom printing runs, packaging manufacturing, or shipping courier status by tracking code"
        className="hidden"
        aria-hidden="true"
      >
        <input
          type="text"
          name="trackingCode"
          toolparamdescription="Order tracking code (e.g. ETB-8841 or DEMO-BOX)"
        />
        <button type="submit">تتبع الطلب</button>
      </form>

      {/* Declarative WebMCP Product Search Form */}
      <form
        action="/products"
        method="GET"
        toolname="search-products"
        tooldescription="Search products in the Etbaaly printing and packaging catalog"
        className="hidden"
        aria-hidden="true"
      >
        <input
          type="text"
          name="query"
          toolparamdescription="Product search keyword (e.g. packaging boxes, business cards, stickers, hoodies)"
        />
        <button type="submit">بحث</button>
      </form>
    </>
  );
}
