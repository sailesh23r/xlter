import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { canAccess } from "@/lib/rbac";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET missing from environment variables");
  }
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("admin_session")?.value;

  // Login route
  if (pathname === "/xeltr-admin/login") {
    if (token) {
      return NextResponse.redirect(
        new URL("/xeltr-admin/dashboard", request.url)
      );
    }

    return NextResponse.next();
  }

  // No token
  if (!token) {
    if (pathname.startsWith("/xeltr-admin")) {
      return NextResponse.redirect(
        new URL("/xeltr-admin/login", request.url)
      );
    }

    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }
  }

  try {
    const { payload } = await jwtVerify(token!, getJwtSecret());

    const role = payload.role as string;

    if (role !== "SUPER_ADMIN") {
      const allowed = canAccess(role as any, pathname);

      if (!allowed) {
        return NextResponse.redirect(
          new URL("/xeltr-admin/unauthorized", request.url)
        );
      }
    }

    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(
      new URL("/xeltr-admin/login", request.url)
    );

    response.cookies.delete("admin_session");

    return response;
  }
}

export const config = {
  matcher: [
    "/xeltr-admin/:path*",
    "/api/admin/:path*",
  ],
};
