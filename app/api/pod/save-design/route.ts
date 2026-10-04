import { NextRequest, NextResponse } from "next/server";
import { saveUserDesign, createOrder } from "@/lib/db";
import { verifyUserForOrder } from "@/lib/auth/userVerification";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // If an immediate order is requested, verify the user first
    let verifiedUser = null;
    if (body.create_order) {
      const authCheck = await verifyUserForOrder(body.user_id);
      if (!authCheck.valid || !authCheck.user) {
        return NextResponse.json(
          {
            success: false,
            error: authCheck.error || "يجب تسجيل الدخول أو إنشاء حساب موثق برقم الهاتف واسم المستخدم لإتمام الطلب.",
          },
          { status: 401 }
        );
      }
      verifiedUser = authCheck.user;
    }

    if (!body.product_id) {
      return NextResponse.json(
        { error: "بيانات المنتج غير مكتملة." },
        { status: 400 }
      );
    }

    // 1. Save design state
    const savedDesign = await saveUserDesign({
      ...body,
      user_id: verifiedUser ? verifiedUser.id : body.user_id,
    });

    // 2. If immediate order requested
    let createdOrder = null;
    if (body.create_order && verifiedUser) {
      createdOrder = await createOrder({
        user_id: verifiedUser.id,
        customer_name: body.customer_name?.trim() || verifiedUser.full_name,
        customer_phone: body.customer_phone?.trim() || verifiedUser.phone,
        customer_email: body.customer_email?.trim() || verifiedUser.email,
        service_type: "طباعة عند الطلب (Print on Demand)",
        product_name: `${body.product_title || "منتج مخصص"} (${body.selected_color || ""})`,
        specs: {
          "المقاس المختار": body.selected_size || "Standard",
          "اللون": body.selected_color || "Standard",
          "تقنية الطباعة": "ديجيتال DTF فائق الدقة 300 DPI",
          "كود التصميم": savedDesign.id,
        },
        quantity: Number(body.quantity) || 1,
        unit_price: Number(body.unit_price) || 280,
        total_price: (Number(body.unit_price) || 280) * (Number(body.quantity) || 1),
        shipping_address: body.shipping_address || "تسليم سريع",
      });
    }

    return NextResponse.json({
      success: true,
      message: "تم حفظ التصميم المخصص بنجاح وإنشاء ملف الطباعة التفاعلي.",
      design: savedDesign,
      order: createdOrder,
    });
  } catch (err: any) {
    console.error("Save design error:", err);
    return NextResponse.json(
      { error: "حدث خطأ أثناء حفظ التصميم، يرجى المحاولة مرة أخرى." },
      { status: 500 }
    );
  }
}
