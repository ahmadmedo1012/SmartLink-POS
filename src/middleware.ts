import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authjs.session-token")
    || request.cookies.get("__Secure-authjs.session-token")
    || request.cookies.get("next-auth.session-token")
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/pos/:path*", "/products/:path*", "/invoices/:path*", "/customers/:path*", "/expenses/:path*", "/inventory/:path*", "/returns/:path*", "/activity/:path*", "/categories/:path*", "/suppliers/:path*", "/reports/:path*", "/settings/:path*"],
}
