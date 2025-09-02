import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Skip middleware for auth routes
  if (req.nextUrl.pathname.startsWith("/auth")) {
    return res
  }

  if (!session) {
    return NextResponse.redirect(new URL("/auth", req.url))
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*"], // protect only /dashboard
}
