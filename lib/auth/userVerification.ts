import { getDb, inMemoryStore } from "@/lib/db";

export interface VerifiedUser {
  id: string;
  username: string;
  full_name: string;
  phone: string;
  email: string;
  role?: string;
  company_name?: string;
  address?: string;
}

/**
 * Validates that a user is logged in, exists in the database, and has all required contact details:
 * 1. Valid registered user_id (not guest/anonymous)
 * 2. Full Name (الاسم بالكامل)
 * 3. Contact Phone Number (رقم الهاتف للتواصل والواتساب)
 * 4. Username (اسم المستخدم)
 */
export async function verifyUserForOrder(userId?: string | null): Promise<{
  valid: boolean;
  error?: string;
  user?: VerifiedUser;
}> {
  if (!userId || userId === "guest" || userId === "anonymous") {
    return {
      valid: false,
      error: "غير مسموح بطلب أي خدمة أو منتج دون تسجيل الدخول بحساب نشط. يرجى تسجيل الدخول أو إنشاء حساب جديد أولاً.",
    };
  }

  let user: any = null;
  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      const rows = await sql`
        SELECT id, username, full_name, phone, email, role, company_name, address 
        FROM users 
        WHERE id = ${userId}
        LIMIT 1
      `;
      if (rows && rows.length > 0) {
        user = rows[0];
      }
    } catch (err) {
      console.error("Error looking up user in DB:", err);
    }
  }

  if (!user) {
    user = inMemoryStore.users.find((u) => u.id === userId);
  }

  if (!user) {
    return {
      valid: false,
      error: "الحساب المستخدم غير موجود في قاعدة بيانات منصة إطبعلي. يرجى تسجيل الدخول أو إنشاء حساب جديد للمتابعة.",
    };
  }

  // Check required profile fields: full_name, phone, username
  const trimmedName = user.full_name?.trim();
  const trimmedPhone = user.phone?.trim();
  const trimmedUsername = user.username?.trim();

  if (!trimmedName) {
    return {
      valid: false,
      error: "بيانات الحساب غير مكتملة: يرجى كتابة اسمك بالكامل في ملفك الشخصي لتأكيد الطلب.",
    };
  }

  if (!trimmedPhone || trimmedPhone.length < 8) {
    return {
      valid: false,
      error: "بيانات الحساب غير مكتملة: يجب تسجيل رقم هاتف للتواصل والواتساب في حسابك لإتمام الطلب ومتابعة الشحنة.",
    };
  }

  if (!trimmedUsername) {
    return {
      valid: false,
      error: "بيانات الحساب غير مكتملة: يرجى تحديد اسم مستخدم (Username) لحسابك لإتمام وحجز الطلب.",
    };
  }

  return {
    valid: true,
    user: {
      id: user.id,
      username: trimmedUsername,
      full_name: trimmedName,
      phone: trimmedPhone,
      email: user.email?.trim() || "",
      role: user.role,
      company_name: user.company_name,
      address: user.address,
    },
  };
}
