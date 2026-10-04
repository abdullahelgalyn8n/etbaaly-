import { NextRequest, NextResponse } from "next/server";
import { saveConfiguredProduct, createOrder } from "@/lib/db";
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

    if (!body.preset_id || !body.selected_components) {
      return NextResponse.json(
        { error: "بيانات تجميع المنتج غير مكتملة." },
        { status: 400 }
      );
    }

    const savedConfig = await saveConfiguredProduct({
      ...body,
      user_id: verifiedUser ? verifiedUser.id : body.user_id,
    });

    let createdOrder = null;
    if (body.create_order && verifiedUser) {
      createdOrder = await createOrder({
        user_id: verifiedUser.id,
        customer_name: body.customer_name?.trim() || verifiedUser.full_name,
        customer_phone: body.customer_phone?.trim() || verifiedUser.phone,
        customer_email: body.customer_email?.trim() || verifiedUser.email,
        service_type: "تجميع علب وتغليف مخصص (Configured Product)",
        product_name: `${body.preset_title} [كود التهيئة: ${savedConfig.id}]`,
        specs: body.bill_of_materials.reduce((acc: any, cur: any) => {
          acc[cur.step] = cur.option;
          return acc;
        }, {}),
        quantity: Number(body.quantity) || 500,
        unit_price: Number(body.unit_price) || 45,
        total_price: (Number(body.unit_price) || 45) * (Number(body.quantity) || 500),
        shipping_address: body.shipping_address || "تسليم مصنع / مقر الشركة",
      });
    }

    return NextResponse.json({
      success: true,
      message: "تم حفظ تركيبة ومواصفات المنتج الإنشائية بنجاح.",
      config: savedConfig,
      order: createdOrder,
    });
  } catch (err: any) {
    console.error("VPC Save Error:", err);
    return NextResponse.json(
      { error: "تعذر حفظ إعدادات المنتج، يرجى المحاولة مرة أخرى." },
      { status: 500 }
    );
  }
}
