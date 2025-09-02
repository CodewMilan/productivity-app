"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    async function finishAuth() {
      const { data, error } = await supabase.auth.getSessionFromUrl({
        storeSession: true,
      })
      if (error) {
        console.error("OAuth error:", error.message)
        router.push("/auth") // fallback
      } else {
        router.push("/dashboard") // success
      }
    }
    finishAuth()
  }, [router])

  return <p className="text-center text-gray-400">Finishing sign in…</p>
}
