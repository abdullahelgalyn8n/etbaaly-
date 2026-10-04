import { NextRequest, NextResponse } from "next/server";
import { saveUserCustomization, createOrder } from "@/lib/db";
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

    if (!body.template_id || !body.selected_color_name) {
      return NextResponse.json(
        { error: "يرجى اختيار لون المنتج قبل المتابعة." },
        { status: 400 }
      );
    }

    // 1. Save user custom record
    const savedRecord = await saveUserCustomization({
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
        service_type: "طباعة منتج مخصص (Custom Merch)",
        product_name: `${body.template_title} [اللون: ${body.selected_color_name}]`,
        specs: {
          "اللون المختار": body.selected_color_name,
          "نص الإهداء/الاسم": body.custom_text || "بدون نص",
          "حالة الصورة": body.uploaded_image_preview ? "تم رفع صورة مخصصة" : "بدون صورة",
          "كود التخصيص": savedRecord.id,
        },
        quantity: Number(body.quantity) || 1,
        unit_price: Number(body.unit_price) || 85,
        total_price: (Number(body.unit_price) || 85) * (Number(body.quantity) || 1),
        shipping_address: body.shipping_address || "تسليم سريع",
      });
    }

    return NextResponse.json({
      success: true,
      message: "تم اعتماد ومعاينة طلبك بنجاح.",
      customization: savedRecord,
      order: createdOrder,
    });
  } catch (err: any) {
    console.error("Customization error:", err);
    return NextResponse.json(
      { error: "حدث خطأ أثناء حفظ الطلب، يرجى المحاولة لاحقاً." },
      { status: 500 }
    );
  }
}
