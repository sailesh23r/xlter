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

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Public routes
  if (
    pathname === "/xeltr-admin/login" ||
    pathname === "/xeltr-admin/unauthorized"
  ) {
    return NextResponse.next();
  }

  // 2. Only handle admin and api/admin routes for the rest of the logic
  if (!pathname.startsWith("/xeltr-admin") && !pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  // 3. Allow public GET access to content APIs
  if (request.method === "GET" && pathname.startsWith("/api/admin/content/")) {
    return NextResponse.next();
  }

  // 4. Handle authentication
  const token = request.cookies.get("admin_session")?.value;

  if (!token) {
    if (pathname.startsWith("/xeltr-admin")) {
      return NextResponse.redirect(new URL("/xeltr-admin/login", request.url));
    }
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    const role = (payload.role as string || "").toUpperCase();

    if (role !== "SUPER_ADMIN") {
      const allowed = canAccess(role as any, pathname);
      if (!allowed) {
        return NextResponse.redirect(new URL("/xeltr-admin/unauthorized", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    const response = NextResponse.redirect(
      new URL("/xeltr-admin/login", request.url)
    );

    response.cookies.set("admin_session", "", {
      expires: new Date(0),
      path: "/",
    });

    return response;
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
