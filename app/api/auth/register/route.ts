import { NextRequest, NextResponse } from "next/server";
import { inMemoryStore, getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password, fullName, phone, companyName, taxNumber, commercialReg, address } = body;

    const trimmedFullName = fullName?.trim();
    const trimmedUsername = username?.trim().toLowerCase();
    const trimmedEmail = email?.trim().toLowerCase();
    const trimmedPhone = phone?.trim();
    const cleanPassword = password?.trim();

    // 1. Strict Validation
    if (!trimmedFullName || !trimmedUsername || !trimmedEmail || !trimmedPhone || !cleanPassword) {
      return NextResponse.json(
        { error: "يرجى تعبئة كافة الحقول الإلزامية: الاسم بالكامل، اسم المستخدم، رقم الهاتف، البريد الإلكتروني، وكلمة المرور." },
        { status: 400 }
      );
    }

    // Username format validation (alphanumeric, underscores, at least 3 chars)
    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
    if (!usernameRegex.test(trimmedUsername)) {
      return NextResponse.json(
        { error: "اسم المستخدم يجب أن يحتوي على حروف إنجليزية وأرقام أو شرطة سفلية (_) فقط، ومن 3 إلى 30 حرفاً." },
        { status: 400 }
      );
    }

    // Phone format validation (Egyptian / general 10-15 digits)
    const phoneClean = trimmedPhone.replace(/[\s-]/g, "");
    if (!/^(\+?20|0)?1[0125][0-9]{8}$/.test(phoneClean) && phoneClean.length < 8) {
      return NextResponse.json(
        { error: "يرجى إدخال رقم هاتف صحيح للتواصل والمتابعة." },
        { status: 400 }
      );
    }

    const userId = `usr-${Date.now()}`;
    const newUser = {
      id: userId,
      username: trimmedUsername,
      email: trimmedEmail,
      password_hash: cleanPassword,
      role: "client",
      full_name: trimmedFullName,
      phone: phoneClean,
      company_name: companyName?.trim() || "",
      tax_number: taxNumber?.trim() || "",
      commercial_reg: commercialReg?.trim() || "",
      address: address?.trim() || "",
      created_at: new Date().toISOString(),
    };

    const { isLive, sql } = getDb();
    if (isLive && sql) {
      try {
        // Check uniqueness for email, username, phone
        const existingUsers = await sql`
          SELECT id, email, username, phone FROM users 
          WHERE LOWER(email) = ${trimmedEmail} 
             OR LOWER(username) = ${trimmedUsername}
             OR phone = ${phoneClean}
          LIMIT 1
        `;

        if (existingUsers && existingUsers.length > 0) {
          const match = existingUsers[0];
          if (match.username?.toLowerCase() === trimmedUsername) {
            return NextResponse.json(
              { error: "اسم المستخدم هذا مسجل بالفعل، يرجى اختيار اسم مستخدم آخر." },
              { status: 409 }
            );
          }
          if (match.email?.toLowerCase() === trimmedEmail) {
            return NextResponse.json(
              { error: "البريد الإلكتروني هذا مستخدم بالفعل، يرجى تسجيل الدخول بدلاً من ذلك." },
              { status: 409 }
            );
          }
          if (match.phone === phoneClean) {
            return NextResponse.json(
              { error: "رقم الهاتف هذا مسجل مسبقاً، يرجى تسجيل الدخول أو استخدام رقمك الحالي." },
              { status: 409 }
            );
          }
        }

        await sql`
          INSERT INTO users (id, username, email, password_hash, full_name, phone, role, company_name, tax_number, commercial_reg, address)
          VALUES (
            ${newUser.id}, ${newUser.username}, ${newUser.email}, ${newUser.password_hash}, ${newUser.full_name},
            ${newUser.phone}, ${newUser.role}, ${newUser.company_name}, ${newUser.tax_number}, ${newUser.commercial_reg}, ${newUser.address}
          )
        `;
      } catch (err: any) {
        console.error("Database register error:", err);
        return NextResponse.json(
          { error: "حدث خطأ أثناء حفظ بيانات المستخدم في قاعدة البيانات." },
          { status: 500 }
        );
      }
    }

    inMemoryStore.users.push(newUser);

    return NextResponse.json({
      success: true,
      message: "تم إنشاء حسابك وتأكيد بيانات التواصل بنجاح.",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        full_name: newUser.full_name,
        company_name: newUser.company_name,
        phone: newUser.phone,
        tax_number: newUser.tax_number,
        address: newUser.address,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "تعذر إنشاء الحساب، يرجى المحاولة مرة أخرى." },
      { status: 500 }
    );
  }
}
