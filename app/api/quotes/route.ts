import { NextRequest, NextResponse } from "next/server";
import { createQuote } from "@/lib/db";
import { verifyUserForOrder } from "@/lib/auth/userVerification";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Enforce authenticated and verified user
    const authCheck = await verifyUserForOrder(body.user_id);
    if (!authCheck.valid || !authCheck.user) {
      return NextResponse.json(
        { 
          success: false, 
          error: authCheck.error || "يجب تسجيل الدخول أو إنشاء حساب موثق برقم الهاتف واسم المستخدم لطلب المقايسة والأسعار الخاصة." 
        },
        { status: 401 }
      );
    }

    if (!body.product_type) {
      return NextResponse.json(
        { error: "يرجى تحديد نوع المطبوعات أو التغليف المطلوب." },
        { status: 400 }
      );
    }

    const payload = {
      ...body,
      user_id: authCheck.user.id,
      customer_name: body.customer_name?.trim() || authCheck.user.full_name,
      phone: body.phone?.trim() || authCheck.user.phone,
      email: body.email?.trim() || authCheck.user.email,
      company: body.company?.trim() || authCheck.user.company_name || "",
    };

    const quote = await createQuote(payload);

    return NextResponse.json({
      success: true,
      message: "تم استلام طلب المقايسة بنجاح. سيتواصل معك أحد مهندسي الطباعة خلال أقل من 30 دقيقة بالمواصفات الفنية المعتمدة وأفضل سعر.",
      quote,
    });
  } catch (err) {
    console.error("Quote creation error:", err);
    return NextResponse.json(
      { error: "تعذر حفظ المقايسة، يرجى المحاولة لاحقاً." },
      { status: 500 }
    );
  }
}
