import { getDb, inMemoryStore } from "./client";
import { PRINT_SHOP_STAGES } from "../constants/orderStages";
import { createAdminNotification } from "./notifications";

export {
  saveUserCustomization,
  saveConfiguredProduct,
  saveUserDesign,
  createQuote,
  createSampleRequest,
} from "./userCustomizations";

export { PRINT_SHOP_STAGES };

export function buildOrderTimeline(currentStatus: string) {
  const stageKeys = ["received", "preflight", "printing", "finishing", "packaging", "shipped", "delivered"];
  const currentStageMeta = PRINT_SHOP_STAGES[currentStatus] || PRINT_SHOP_STAGES.received;
  const currentOrder = currentStageMeta.order;
  const nowFormatted = new Date().toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return stageKeys.map((key) => {
    const meta = PRINT_SHOP_STAGES[key];
    const isCompleted = meta.order <= currentOrder;
    const isCurrent = meta.order === currentOrder;

    return {
      step: meta.stepName,
      date: isCurrent ? nowFormatted : isCompleted ? "مكتملة" : "قيد الانتظار",
      completed: isCompleted,
      current: isCurrent,
      desc: meta.desc,
    };
  });
}

export async function getOrderByTrackingCode(code: string) {
  const normalizedCode = code.trim().toUpperCase();
  const { isLive, sql } = getDb();

  if (isLive && sql) {
    try {
      const rows = await sql`
        SELECT * FROM orders 
        WHERE UPPER(tracking_code) = ${normalizedCode} OR customer_phone = ${code.trim()} OR UPPER(id) = ${normalizedCode}
        LIMIT 1
      `;
      if (rows && rows.length > 0) {
        return rows[0];
      }
    } catch (err) {
      console.error("Error querying Neon DB:", err);
    }
  }

  return (
    inMemoryStore.orders.find(
      (o) =>
        o.tracking_code.toUpperCase() === normalizedCode ||
        o.customer_phone === code.trim() ||
        o.id.toUpperCase() === normalizedCode
    ) || null
  );
}

export async function createOrder(orderData: any) {
  const codeSuffix = Math.floor(1000 + Math.random() * 9000);
  const trackingCode = `ETB-${codeSuffix}`;
  const initialTimeline = buildOrderTimeline("received");

  const newOrder = {
    id: `ord-${codeSuffix}`,
    tracking_code: trackingCode,
    user_id: orderData.user_id || "guest",
    customer_name: orderData.customer_name || "عميل إطبعلي",
    customer_phone: orderData.customer_phone || "",
    customer_email: orderData.customer_email || "",
    service_type: orderData.service_type || "خدمات طباعة وتخصيص",
    product_name: orderData.product_name || "طلب طباعة مخصص",
    specs: orderData.specs || {},
    quantity: Number(orderData.quantity) || 1,
    unit_price: Number(orderData.unit_price) || 0,
    total_price: Number(orderData.total_price) || 0,
    status: "received",
    status_label: PRINT_SHOP_STAGES.received.label,
    shipping_address: orderData.shipping_address || "",
    shipping_city: orderData.shipping_city || "القاهرة",
    shipping_method: orderData.shipping_method || "توصيل قياسي",
    estimated_delivery: "خلال 24 - 48 ساعة",
    courier_name: "سيتم تعيين المندوب قريباً",
    courier_phone: "--",
    timeline: initialTimeline,
    notes: orderData.notes || "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await sql`
        INSERT INTO orders (
          id, tracking_code, user_id, customer_name, customer_phone, customer_email,
          service_type, product_name, specs, quantity, unit_price, total_price,
          status, status_label, shipping_address, shipping_city, shipping_method,
          estimated_delivery, timeline, notes
        ) VALUES (
          ${newOrder.id}, ${newOrder.tracking_code}, ${newOrder.user_id},
          ${newOrder.customer_name}, ${newOrder.customer_phone}, ${newOrder.customer_email},
          ${newOrder.service_type}, ${newOrder.product_name}, ${JSON.stringify(newOrder.specs)}::jsonb,
          ${newOrder.quantity}, ${newOrder.unit_price}, ${newOrder.total_price},
          ${newOrder.status}, ${newOrder.status_label}, ${newOrder.shipping_address},
          ${newOrder.shipping_city}, ${newOrder.shipping_method}, ${newOrder.estimated_delivery},
          ${JSON.stringify(newOrder.timeline)}::jsonb, ${newOrder.notes}
        )
      `;
    } catch (err) {
      console.error("Error inserting order to Neon:", err);
    }
  }

  inMemoryStore.orders.unshift(newOrder);

  // Trigger real-time admin notification
  try {
    await createAdminNotification({
      title: `طلب شراء جديد: ${newOrder.product_name}`,
      message: `طلب جديد برقم تتبع ${newOrder.tracking_code} من العميل "${newOrder.customer_name}" بإجمالي ${Number(newOrder.total_price).toLocaleString()} ج.م (${newOrder.quantity} قطعة).`,
      type: "order",
      priority: "high",
      link: "/admin/orders",
      metadata: {
        orderId: newOrder.id,
        trackingCode: newOrder.tracking_code,
        customer: newOrder.customer_name,
        amount: newOrder.total_price,
      },
    });
  } catch (err) {
    console.error("Failed to emit admin notification for new order:", err);
  }

  return newOrder;
}

export async function updateOrderStatus(orderId: string, status: string, statusLabel?: string) {
  const stageMeta = PRINT_SHOP_STAGES[status] || PRINT_SHOP_STAGES.received;
  const resolvedStatus = PRINT_SHOP_STAGES[status] ? status : "received";
  const resolvedLabel = statusLabel || stageMeta.label;
  const newTimeline = buildOrderTimeline(resolvedStatus);
  const timelineJson = JSON.stringify(newTimeline);

  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await sql`
        UPDATE orders 
        SET 
          status = ${resolvedStatus}, 
          status_label = ${resolvedLabel},
          timeline = ${timelineJson}::jsonb,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${orderId} OR tracking_code = ${orderId}
      `;
    } catch (err) {
      console.error("Neon updateOrderStatus error:", err);
    }
  }

  const ord = inMemoryStore.orders.find((o) => o.id === orderId || o.tracking_code === orderId);
  if (ord) {
    ord.status = resolvedStatus;
    ord.status_label = resolvedLabel;
    ord.timeline = newTimeline;
    ord.updated_at = new Date().toISOString();
  }
  return true;
}
