import { NextRequest, NextResponse } from "next/server";
import { inMemoryStore, getDb } from "@/lib/db";
import { generateAdminToken } from "@/lib/auth/adminGuard";
import { verifyPassword } from "@/lib/auth/password";
import { checkRateLimit, recordRateLimitAttempt, resetRateLimit, getClientIp } from "@/lib/security/rateLimiter";
import { sanitizeEmail } from "@/lib/security/sanitize";

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request.headers);
    const rateLimitKey = `login:${clientIp}`;

    // 1. Rate Limiting Protection (Max 5 attempts per 5 minutes per IP)
    const rateLimit = checkRateLimit(rateLimitKey, 5, 5 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `تم تجاوز الحد الأقصى لمحاولات تسجيل الدخول. يرجى الانتظار لمدة ${rateLimit.retryAfterSeconds} ثانية قبل المحاولة مرة أخرى لحماية حسابك.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password, role: requestedRole, botToken } = body;

    // 2. Bot Verification Guard
    if (!botToken) {
      recordRateLimitAttempt(rateLimitKey);
      return NextResponse.json(
        { error: "يرجى تأكيد التحقق من أنك لست برنامج روبوت قبل المتابعة." },
        { status: 400 }
      );
    }

    // Cloudflare Turnstile Server Verification (if secret configured)
    if (process.env.TURNSTILE_SECRET_KEY && typeof botToken === "string" && !botToken.startsWith("bvt_")) {
      try {
        const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${encodeURIComponent(process.env.TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(botToken)}`,
        });
        const verifyData: any = await verifyRes.json();
        if (!verifyData.success) {
          recordRateLimitAttempt(rateLimitKey);
          return NextResponse.json(
            { error: "فشل التحقق الأمني من Cloudflare Turnstile، يرجى المحاولة مرة أخرى." },
            { status: 400 }
          );
        }
      } catch (err) {
        console.warn("Turnstile siteverify error:", err);
      }
    } else if (typeof botToken === "string" && botToken.startsWith("bvt_")) {
      const parts = botToken.split("_");
      const tokenTime = parseInt(parts[1], 10);
      const now = Date.now();
      if (isNaN(tokenTime) || tokenTime > now + 60000 || now - tokenTime > 15 * 60 * 1000) {
        recordRateLimitAttempt(rateLimitKey);
        return NextResponse.json(
          { error: "انتهت صلاحية رمز التحقق الأمني، يرجى إعادة النقر على 'أنا لست روبوت'." },
          { status: 400 }
        );
      }
    }

    if (!email || !password) {
      recordRateLimitAttempt(rateLimitKey);
      return NextResponse.json(
        { error: "يرجى كتابة البريد الإلكتروني وكلمة المرور." },
        { status: 400 }
      );
    }

    const normalizedInput = email.trim().toLowerCase();
    const isAdminAccount = normalizedInput === "admin@etbaaly.com" || normalizedInput === "assem_admin" || normalizedInput.startsWith("admin@");

    // 3. Handle Predefined Admin User with password verification
    if (isAdminAccount) {
      const adminPasswordCandidate = process.env.ADMIN_PASSWORD || "admin123456";
      const isAdminPasswordValid = await verifyPassword(password, adminPasswordCandidate);

      if (!isAdminPasswordValid) {
        recordRateLimitAttempt(rateLimitKey);
        return NextResponse.json(
          { success: false, error: "كلمة المرور غير صحيحة لحساب المسؤول." },
          { status: 401 }
        );
      }

      resetRateLimit(rateLimitKey);
      const adminUser = {
        id: "usr-admin-01",
        username: "assem_admin",
        email: "admin@etbaaly.com",
        full_name: "م. عاصم (مدير منصة إطبعلي)",
        role: "admin",
        company_name: "إدارة إطبعلي المركزية - A.Z",
        phone: "01099887766",
        tax_number: "990-112-400",
        address: "المقر الرئيسي - مدينة نصر، القاهرة",
      };
      const token = generateAdminToken(adminUser);
      const res = NextResponse.json({
        success: true,
        user: adminUser,
        token,
        redirectUrl: "/admin",
      });
      res.cookies.set("etbaaly_admin_token", token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
      });
      return res;
    }

    // 4. Check Database with Secure Cryptographic Password Verification
    const { isLive, sql } = getDb();
    if (isLive && sql) {
      try {
        const rows = await sql`
          SELECT * FROM users 
          WHERE (LOWER(email) = ${normalizedInput} OR LOWER(username) = ${normalizedInput}) 
          LIMIT 1
        `;
        if (rows && rows.length > 0) {
          const user = rows[0];
          const isPasswordValid = await verifyPassword(password, user.password_hash || "");

          if (isPasswordValid) {
            resetRateLimit(rateLimitKey);
            const userRole = user.role || (isAdminAccount ? "admin" : "client");
            const userData = {
              id: user.id,
              username: user.username || `user_${user.id.slice(4)}`,
              email: user.email,
              full_name: user.full_name,
              role: userRole,
              company_name: user.company_name,
              phone: user.phone,
              tax_number: user.tax_number,
              address: user.address,
            };
            const token = userRole === "admin" ? generateAdminToken(userData) : undefined;
            const res = NextResponse.json({
              success: true,
              user: userData,
              token,
              redirectUrl: userRole === "admin" ? "/admin" : "/dashboard",
            });
            if (token) {
              res.cookies.set("etbaaly_admin_token", token, {
                httpOnly: true,
                path: "/",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60,
              });
            }
            return res;
          }
        }
      } catch (err) {
        console.error("Neon auth error:", err);
      }
    }

    // 5. Check in-memory store
    const user = inMemoryStore.users.find(
      (u) => u.email.toLowerCase() === normalizedInput || (u as any).username?.toLowerCase() === normalizedInput
    );

    if (user) {
      const isPasswordValid = await verifyPassword(password, user.password_hash || "");
      if (isPasswordValid) {
        resetRateLimit(rateLimitKey);
        const userRole = (user as any).role || (isAdminAccount ? "admin" : "client");
        const userData = {
          id: user.id,
          username: (user as any).username || `user_${user.id.slice(4)}`,
          email: user.email,
          full_name: user.full_name,
          role: userRole,
          company_name: user.company_name,
          phone: user.phone,
          tax_number: user.tax_number,
          address: user.address,
        };
        const token = userRole === "admin" ? generateAdminToken(userData) : undefined;
        const res = NextResponse.json({
          success: true,
          user: userData,
          token,
          redirectUrl: userRole === "admin" ? "/admin" : "/dashboard",
        });
        if (token) {
          res.cookies.set("etbaaly_admin_token", token, {
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60,
          });
        }
        return res;
      }
    }

    // 6. Local development mock session fallback
    if (process.env.NODE_ENV === "development") {
      const dynamicUser = {
        id: `usr-${Date.now().toString().slice(-4)}`,
        email: normalizedInput,
        full_name: normalizedInput.split("@")[0].replace(".", " "),
        role: "client" as const,
        company_name: "مؤسسة الأعمال المتقدمة (تجريبي)",
        phone: "01000000000",
        tax_number: "900-112-455",
        address: "القاهرة، جمهورية مصر العربية",
      };
      return NextResponse.json({
        success: true,
        user: dynamicUser,
        redirectUrl: "/dashboard",
      });
    }

    // 7. Authentication Failed in Production
    recordRateLimitAttempt(rateLimitKey);
    return NextResponse.json(
      { error: "بيانات الدخول غير صحيحة، يرجى التأكد من البريد الإلكتروني وكلمة المرور." },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "حدث خطأ أثناء تسجيل الدخول." },
      { status: 500 }
    );
  }
}
