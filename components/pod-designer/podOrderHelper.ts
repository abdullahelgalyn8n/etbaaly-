import { CanvasElement } from "./types";

export function calculatePODPrice(basePrice: number, quantity: number) {
  let discountFactor = 1.0;
  if (quantity >= 50) discountFactor = 0.75;
  else if (quantity >= 20) discountFactor = 0.82;
  else if (quantity >= 5) discountFactor = 0.9;

  const unitPrice = Math.round(basePrice * discountFactor);
  const totalPrice = unitPrice * quantity;
  return { unitPrice, totalPrice };
}

export interface SavePODDesignParams {
  product: { id: string; title: string; image?: string };
  selectedColor: { name: string };
  selectedSize: string;
  elements: CanvasElement[];
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  quantity: number;
  unitPrice: number;
}

export async function submitPODOrder(params: SavePODDesignParams) {
  const res = await fetch("/api/pod/save-design", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product_id: params.product.id,
      product_title: params.product.title,
      selected_color: params.selectedColor.name,
      selected_size: params.selectedSize,
      canvas_state: params.elements,
      preview_url: params.product.image || "/images/social-media/amm-yousry-designs.webp",
      create_order: true,
      customer_name: params.clientName || "عميل استوديو التصميم",
      customer_phone: params.clientPhone,
      shipping_address: params.clientAddress,
      quantity: params.quantity,
      unit_price: params.unitPrice,
    }),
  });

  return res.json();
}
