import { NextRequest, NextResponse } from "next/server";
import { createSampleRequest } from "@/lib/db";
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
          error: authCheck.error || "يجب تسجيل الدخول أو إنشاء حساب موثق برقم الهاتف واسم المستخدم لطلب بوكس العينات التجاري." 
        },
        { status: 401 }
      );
    }

    if (!body.company_name || !body.address || !body.city) {
      return NextResponse.json(
        { error: "يرجى كتابة اسم الشركة، المدينة، والعنوان بالتفصيل لتسليم بوكس العينات." },
        { status: 400 }
      );
    }

    const payload = {
      ...body,
      user_id: authCheck.user.id,
      contact_name: body.contact_name?.trim() || authCheck.user.full_name,
      phone: body.phone?.trim() || authCheck.user.phone,
      email: body.email?.trim() || authCheck.user.email,
    };

    const sample = await createSampleRequest(payload);

    return NextResponse.json({
      success: true,
      message: "تم تسجيل طلب بوكس العينات المجاني بنجاح! سيتم تجهيز البوكس وشحنه لعنوان شركتكم مجاناً خلال 48 ساعة.",
      sample,
    });
  } catch (err) {
    console.error("Sample request error:", err);
    return NextResponse.json(
      { error: "تعذر تسجيل الطلب، يرجى المحاولة لاحقاً." },
      { status: 500 }
    );
  }
}
