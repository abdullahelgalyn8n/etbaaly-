import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin and any sub-routes
  if (pathname.startsWith("/admin")) {
    const adminToken = request.cookies.get("etbaaly_admin_token")?.value;

    // If no admin token cookie exists, redirect immediately to login
    if (!adminToken) {
      const loginUrl = new URL("/login/", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
