import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth, generateAdminToken } from "@/lib/auth/adminGuard";

export async function GET(request: NextRequest) {
  const auth = verifyAdminAuth(request);
  return NextResponse.json({
    isAdmin: auth.authorized,
    user: auth.payload || null,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { role, email, id, full_name } = body;

    if (role === "admin" || email?.includes("admin")) {
      const existingAuth = verifyAdminAuth(request);
      const isDev = process.env.NODE_ENV !== "production";

      // If in production and not already authenticated, reject unauthorized token minting
      if (!existingAuth.authorized && !isDev) {
        return NextResponse.json(
          { success: false, error: "غير مصرح بتجديد جلسة المسؤول دون تسجيل دخول مسبق." },
          { status: 401 }
        );
      }

      const adminUser = {
        id: id || "usr-admin-01",
        email: email || "admin@etbaaly.com",
        full_name: full_name || "م. عاصم (مدير منصة إطبعلي)",
        role: "admin" as const,
      };

      const token = generateAdminToken(adminUser);
      const res = NextResponse.json({
        success: true,
        isAdmin: true,
        token,
        user: adminUser,
      });

      res.cookies.set("etbaaly_admin_token", token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
      });

      return res;
    }

    // If client role or clearing session
    const res = NextResponse.json({
      success: true,
      isAdmin: false,
    });
    res.cookies.set("etbaaly_admin_token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
      maxAge: 0,
    });
    return res;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
