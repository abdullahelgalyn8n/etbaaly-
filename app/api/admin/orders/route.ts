import { NextRequest, NextResponse } from "next/server";
import { inMemoryStore, getDb, updateOrderStatus } from "@/lib/db";
import { guardAdminRoute } from "@/lib/auth/adminGuard";

export async function GET(request: NextRequest) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;

  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
      return NextResponse.json({ success: true, count: rows.length, orders: rows });
    } catch (err) {
      console.error(err);
    }
  }

  return NextResponse.json({
    success: true,
    count: inMemoryStore.orders.length,
    orders: inMemoryStore.orders,
  });
}

export async function PATCH(request: NextRequest) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;
  try {
    const body = await request.json();
    const { orderId, status, statusLabel } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "يرجى تحديد رقم الطلب والحالة الجديدة." },
        { status: 400 }
      );
    }

    await updateOrderStatus(orderId, status, statusLabel);

    return NextResponse.json({
      success: true,
      message: `تم تحديث حالة الطلب إلى "${statusLabel || status}" بنجاح.`,
    });
  } catch (err) {
    return NextResponse.json({ error: "فشل تحديث الطلب" }, { status: 500 });
  }
}
