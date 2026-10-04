import { NextRequest, NextResponse } from "next/server";
import { createOrder, inMemoryStore, getDb } from "@/lib/db";
import { verifyUserForOrder } from "@/lib/auth/userVerification";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || "usr-demo-01";

  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      const rows =
        userId === "all"
          ? await sql`SELECT * FROM orders ORDER BY created_at DESC`
          : await sql`SELECT * FROM orders WHERE user_id = ${userId} ORDER BY created_at DESC`;
      return NextResponse.json({ success: true, orders: rows });
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  }

  // Fallback
  const userOrders = inMemoryStore.orders.filter(
    (o) => o.user_id === userId || userId === "all"
  );
  return NextResponse.json({ success: true, orders: userOrders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Enforce authenticated and verified user
    const authCheck = await verifyUserForOrder(body.user_id);
    if (!authCheck.valid || !authCheck.user) {
      return NextResponse.json(
        { 
          success: false, 
          error: authCheck.error || "يجب تسجيل الدخول وإنشاء حساب مكتمل البيانات (الاسم، رقم الهاتف للتواصل، واسم المستخدم) لإتمام الطلب." 
        },
        { status: 401 }
      );
    }

    if (!body.product_name) {
      return NextResponse.json(
        { error: "يرجى تحديد تفاصيل ومواصفات المنتج المطلوب." },
        { status: 400 }
      );
    }

    // Attach verified user information to the order
    const orderPayload = {
      ...body,
      user_id: authCheck.user.id,
      customer_name: body.customer_name?.trim() || authCheck.user.full_name,
      customer_phone: body.customer_phone?.trim() || authCheck.user.phone,
      customer_email: body.customer_email?.trim() || authCheck.user.email,
    };

    const created = await createOrder(orderPayload);

    return NextResponse.json({
      success: true,
      message: "تم إنشاء أمر الشغل بنجاح وحجز رقم التتبع الفوري.",
      order: created,
    });
  } catch (error: any) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "تعذر تسجيل الطلب، يرجى المحاولة مرة أخرى." },
      { status: 500 }
    );
  }
}
