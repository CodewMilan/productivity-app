// app/auth/callback/route.ts
import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import type { NextRequest } from "next/server"
import { cookies } from "next/headers"

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
  }

  // ✅ Redirect to dashboard after login
  return NextResponse.redirect(new URL("/dashboard", requestUrl.origin))
}
