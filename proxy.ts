import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths, api routes, and admin pages
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/xlter-admin") ||
    pathname.includes(".") // skip files (images, etc)
  ) {
    return NextResponse.next();
  }

  try {
    // Fetch redirects from our public API
    // Note: In a production environment, you should cache this or use Edge Config
    const origin = request.nextUrl.origin;
    const res = await fetch(`${origin}/api/public/redirects`, {
      next: { revalidate: 60 } // Try to use Next.js fetch cache if available
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.redirects) {
        const redirect = data.redirects.find((r: any) => r.source === pathname);
        if (redirect) {
          return NextResponse.redirect(
            new URL(redirect.destination, request.url),
            redirect.permanent ? 308 : 307
          );
        }
      }
    }
  } catch (error) {
    console.error("Middleware Redirect Error:", error);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
