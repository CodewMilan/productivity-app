import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      },
    }
  )

  const token = req.cookies.get("sb-access-token")?.value


  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url))
  }

  return NextResponse.next()
}


export const config = {
  matcher: ["/dashboard/:path*"],
}
