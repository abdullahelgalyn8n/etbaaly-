import { NextRequest, NextResponse } from "next/server";
import { getOrderByTrackingCode } from "@/lib/db";
import { demoSimulationOrders } from "@/components/order-tracker/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawCode = (searchParams.get("code") || searchParams.get("q") || "").trim();
  const userId = searchParams.get("userId") || "";
  const userEmail = (searchParams.get("userEmail") || "").trim().toLowerCase();
  const userPhone = (searchParams.get("userPhone") || "").trim();
  const isAdmin = searchParams.get("isAdmin") === "true";
  const isDemoParam = searchParams.get("isDemo") === "true";

  if (!rawCode) {
    return NextResponse.json(
      { error: "يرجى كتابة رقم التتبع أو اختيار أحد النماذج التوضيحية." },
      { status: 400 }
    );
  }

  const normalizedCode = rawCode.toUpperCase();

  // 1. Check if it is a Demo Simulation Order (Accessible to everyone as a simulator)
  if (demoSimulationOrders[normalizedCode] || isDemoParam) {
    const demoOrder = demoSimulationOrders[normalizedCode] || demoSimulationOrders["DEMO-BOX"];
    return NextResponse.json({
      success: true,
      order: demoOrder,
      isDemo: true,
      message: "هذا نموذج محاكاة تجريبي تفاعلي لتوضيح مراحل تتبع الإنتاج والشحن.",
    });
  }

  const hasUserCredentials = Boolean(userId || userEmail || userPhone || isAdmin);

  try {
    const order = await getOrderByTrackingCode(rawCode);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          notFound: true,
          error: "لم يتم العثور على طلب برقم التتبع أو رقم الهاتف المدخل. يرجى التأكد من الرقم والمحاولة مرة أخرى.",
        },
        { status: 404 }
      );
    }

    // 2. Authorization & Ownership Validation
    const hasUserCredentials = Boolean(userId || userEmail || userPhone);
    const isOwner =
      (userId && order.user_id === userId) ||
      (userEmail && order.customer_email?.toLowerCase() === userEmail) ||
      (userPhone && order.customer_phone === userPhone);

    if (isAdmin || isOwner || order.user_id === "guest" || !order.user_id) {
      return NextResponse.json({
        success: true,
        order,
        authorizedAs: isAdmin ? "admin" : isOwner ? "owner" : "guest",
      });
    }

    // If order belongs to another registered client
    if (hasUserCredentials) {
      return NextResponse.json(
        {
          success: false,
          forbidden: true,
          error: "هذا الطلب غير مسجل باسم حسابك. حمايةً لخصوصية وسرية بيانات العملاء والشركات، يمكنك فقط تتبع الطلبات الصادرة من حسابك.",
        },
        { status: 403 }
      );
    }

    // If not logged in and not guest
    return NextResponse.json(
      {
        success: false,
        requireAuth: true,
        error: "لتتبع أوامر الشغل الحقيقية وحماية خصوصية بيانات العميل والشحن، يرجى تسجيل الدخول أولاً.",
      },
      { status: 401 }
    );
  } catch (error: any) {
    console.error("Order tracking error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب بيانات التتبع. يرجى المحاولة لاحقاً." },
      { status: 500 }
    );
  }
}
