import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  // Allow auth API through without session check (handles login itself)
  if (req.nextUrl.pathname.startsWith("/api/auth")) return NextResponse.next()
  if (!req.auth) {
    const isApi = req.nextUrl.pathname.startsWith("/api/")
    if (isApi) return Response.json({ error: "Unauthorized" }, { status: 401 })
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }
  return NextResponse.next()
})

export const config = {
  matcher: ["/api/:path*", "/pos/:path*", "/products/:path*", "/invoices/:path*", "/customers/:path*", "/expenses/:path*", "/inventory/:path*", "/returns/:path*", "/activity/:path*", "/categories/:path*", "/suppliers/:path*", "/reports/:path*", "/settings/:path*"],
}
