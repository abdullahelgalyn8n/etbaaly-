import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const ADMIN_SECRET =
  process.env.ADMIN_AUTH_SECRET ||
  process.env.ADMIN_API_KEY ||
  "etba3-central-admin-hmac-sha256-secret-key-2026";

export interface AdminTokenPayload {
  userId: string;
  email: string;
  role: "admin";
  exp: number;
}

/**
 * Generate a cryptographically signed admin auth token
 */
export function generateAdminToken(user: { id: string; email: string; role?: string }): string {
  const payload: AdminTokenPayload = {
    userId: user.id,
    email: user.email.toLowerCase(),
    role: "admin",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
}

/**
 * Verify an admin auth token's signature and expiration
 */
export function verifyAdminToken(token: string): { valid: boolean; payload?: AdminTokenPayload; error?: string } {
  if (!token || typeof token !== "string") {
    return { valid: false, error: "رمز المصادقة غير موجود." };
  }

  const parts = token.trim().split(".");
  if (parts.length !== 2) {
    return { valid: false, error: "صيغة رمز المصادقة غير صحيحة." };
  }

  const [encodedPayload, providedSignature] = parts;

  const expectedSignature = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(encodedPayload)
    .digest("base64url");

  // Constant-time comparison to prevent timing attacks
  const providedBuf = Buffer.from(providedSignature);
  const expectedBuf = Buffer.from(expectedSignature);

  if (providedBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(providedBuf, expectedBuf)) {
    return { valid: false, error: "توقيع الرمز غير صالح أو تم التلاعب به." };
  }

  try {
    const payloadJson = Buffer.from(encodedPayload, "base64url").toString("utf-8");
    const payload: AdminTokenPayload = JSON.parse(payloadJson);

    if (payload.role !== "admin") {
      return { valid: false, error: "الصلاحيات غير كافية، يتطلب حساب مسؤول." };
    }

    if (payload.exp && Date.now() > payload.exp) {
      return { valid: false, error: "انتهت صلاحية جلسة المسؤول، يرجى تسجيل الدخول مجدداً." };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false, error: "تعذر فك تشفير بيانات الجلسة." };
  }
}

/**
 * Extract token from request: Headers, Cookies, or direct API Key
 */
export function extractAdminTokenFromRequest(req: Request | NextRequest): string | null {
  // 1. Authorization: Bearer <token>
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7).trim();
  }

  // 2. x-admin-token custom header
  const customHeader = req.headers.get("x-admin-token");
  if (customHeader) {
    return customHeader.trim();
  }

  // 3. Check Cookie (etbaaly_admin_token)
  if ("cookies" in req && typeof (req as NextRequest).cookies?.get === "function") {
    const cookie = (req as NextRequest).cookies.get("etbaaly_admin_token");
    if (cookie?.value) {
      return cookie.value;
    }
  }

  // Fallback parse from Cookie header string
  const cookieHeader = req.headers.get("cookie");
  if (cookieHeader) {
    const match = cookieHeader.match(/(?:^|;\s*)etbaaly_admin_token=([^;]+)/);
    if (match && match[1]) {
      return decodeURIComponent(match[1]);
    }
  }

  return null;
}

/**
 * Check if the request contains valid admin credentials
 */
export function verifyAdminAuth(req: Request | NextRequest): { authorized: boolean; error?: string; payload?: AdminTokenPayload } {
  // Check direct API key matching for server-to-server or CI operations
  const directApiKey = req.headers.get("x-admin-key");
  const configuredApiKey = process.env.ADMIN_API_KEY;
  if (configuredApiKey && directApiKey && directApiKey === configuredApiKey) {
    return {
      authorized: true,
      payload: {
        userId: "api-key-admin",
        email: "system@etbaaly.com",
        role: "admin",
        exp: Date.now() + 86400000,
      },
    };
  }

  const token = extractAdminTokenFromRequest(req);
  if (!token) {
    return {
      authorized: false,
      error: "غير مصرح: يرجى تسجيل الدخول كمسؤول للوصول إلى لوحة التحكم.",
    };
  }

  const result = verifyAdminToken(token);
  if (!result.valid) {
    return {
      authorized: false,
      error: result.error || "جلسة غير صالحة.",
    };
  }

  return {
    authorized: true,
    payload: result.payload,
  };
}

/**
 * Protect admin routes: Returns 401 response if unauthorized, or null if authorized
 */
export function guardAdminRoute(req: Request | NextRequest): NextResponse | null {
  const auth = verifyAdminAuth(req);
  if (!auth.authorized) {
    return NextResponse.json(
      {
        success: false,
        error: auth.error || "غير مصرح لك بالوصول. يرجى تسجيل الدخول كمسؤول.",
      },
      { status: 401 }
    );
  }
  return null;
}
