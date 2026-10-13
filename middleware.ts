import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block malicious probe requests / scanner paths immediately without invoking SSR/Edge app logic
  const lowerPath = pathname.toLowerCase();
  const isMaliciousProbe =
    lowerPath.endsWith(".env") ||
    lowerPath.includes(".env.") ||
    lowerPath.includes(".env~") ||
    lowerPath.includes(".env-") ||
    lowerPath.endsWith(".swp") ||
    lowerPath.endsWith(".php") ||
    lowerPath.endsWith("composer.json") ||
    lowerPath.endsWith("credentials") ||
    lowerPath.endsWith("auth.json") ||
    lowerPath.endsWith("appsettings.json") ||
    lowerPath.includes("appsettings.") ||
    lowerPath.includes("/wp-") ||
    lowerPath.includes("/.aws") ||
    lowerPath.includes("/.docker") ||
    lowerPath.includes("/.amplifyrc");

  if (isMaliciousProbe) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain", "Cache-Control": "public, max-age=86400" },
    });
  }

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
  matcher: [
    /*
     * Match ONLY admin routes and sensitive probe paths to protect worker CPU limits
     */
    "/admin/:path*",
    "/admin",
  ],
};
