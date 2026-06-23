import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow auth API (handles login itself)
  if (pathname.startsWith("/api/auth")) return NextResponse.next()
  // Allow public API routes
  if (pathname === "/api/dashboard") return NextResponse.next()

  // Check for session token cookie
  const token = req.cookies.get("next-auth.session-token")?.value
    || req.cookies.get("__Secure-next-auth.session-token")?.value

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

// ponytail: Only API routes need auth. Page shells are public; API 401 protects data.
export const config = {
  matcher: ["/api/:path*"],
}
