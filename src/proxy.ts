import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const token = request.cookies.get("authjs.session-token") || request.cookies.get("next-auth.session-token")
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/pos/:path*", "/products/:path*", "/invoices/:path*", "/customers/:path*", "/reports/:path*", "/settings/:path*"],
}
