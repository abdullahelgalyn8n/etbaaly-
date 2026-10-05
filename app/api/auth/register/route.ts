import { NextRequest, NextResponse } from "next/server";
import { inMemoryStore, getDb } from "@/lib/db";
import { hashPassword, validatePasswordStrength } from "@/lib/auth/password";
import { sanitizeString, sanitizeEmail, sanitizePhone, sanitizeUsername } from "@/lib/security/sanitize";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password, fullName, phone, companyName, taxNumber, commercialReg, address } = body;

    const trimmedFullName = sanitizeString(fullName);
    const rawUsername = sanitizeUsername(username);
    const trimmedEmail = sanitizeEmail(email);
    const trimmedPhone = sanitizePhone(phone);
    const cleanPassword = typeof password === "string" ? password.trim() : "";

    // 1. Core Validation (Only essential fields are mandatory)
    if (!trimmedFullName || !trimmedEmail || !trimmedPhone || !cleanPassword) {
      return NextResponse.json(
        { error: "يرجى تعبئة الحقول الأساسية: الاسم بالكامل، البريد الإلكتروني، رقم الهاتف، وكلمة المرور." },
        { status: 400 }
      );
    }

    // 2. Strong Password Policy Enforcement
    const passwordCheck = validatePasswordStrength(cleanPassword);
    if (!passwordCheck.isValid) {
      return NextResponse.json(
        { error: passwordCheck.message || "كلمة المرور يجب ألا تقل عن 8 خانات وتحتوي على حروف وأرقام." },
        { status: 400 }
      );
    }

    // Auto-generate username from email if not provided
    let finalUsername = rawUsername;
    if (!finalUsername) {
      const emailBase = trimmedEmail.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_").slice(0, 18);
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      finalUsername = `${emailBase || "user"}_${randomSuffix}`.toLowerCase();
    } else {
      // Validate custom username format
      const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
      if (!usernameRegex.test(finalUsername)) {
        return NextResponse.json(
          { error: "اسم المستخدم يجب أن يحتوي على حروف إنجليزية وأرقام أو شرطة سفلية (_) فقط، ومن 3 إلى 30 حرفاً." },
          { status: 400 }
        );
      }
    }

    // Phone format validation (Egyptian / general 8-15 digits)
    const phoneClean = trimmedPhone.replace(/[\s-]/g, "");
    if (!/^(\+?20|0)?1[0125][0-9]{8}$/.test(phoneClean) && phoneClean.length < 8) {
      return NextResponse.json(
        { error: "يرجى إدخال رقم هاتف صحيح للتواصل ومتابعة الطلبات." },
        { status: 400 }
      );
    }

    const userId = `usr-${Date.now()}`;
    const passwordHashed = await hashPassword(cleanPassword);
    const newUser = {
      id: userId,
      username: finalUsername,
      email: trimmedEmail,
      password_hash: passwordHashed,
      role: "client",
      full_name: trimmedFullName,
      phone: phoneClean,
      company_name: sanitizeString(companyName),
      tax_number: sanitizeString(taxNumber),
      commercial_reg: sanitizeString(commercialReg),
      address: sanitizeString(address),
      created_at: new Date().toISOString(),
    };

    const { isLive, sql } = getDb();
    if (isLive && sql) {
      try {
        // Check uniqueness for email, username, phone
        const existingUsers = await sql`
          SELECT id, email, username, phone FROM users 
          WHERE LOWER(email) = ${trimmedEmail} 
             OR LOWER(username) = ${finalUsername}
             OR phone = ${phoneClean}
          LIMIT 1
        `;

        if (existingUsers && existingUsers.length > 0) {
          const match = existingUsers[0];
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
          if (match.username?.toLowerCase() === finalUsername) {
            if (rawUsername) {
              return NextResponse.json(
                { error: "اسم المستخدم هذا مسجل بالفعل، يرجى اختيار اسم مستخدم آخر." },
                { status: 409 }
              );
            } else {
              // If auto-generated conflicted, append timestamp to make it unique
              newUser.username = `${finalUsername}_${Date.now().toString().slice(-4)}`;
            }
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
