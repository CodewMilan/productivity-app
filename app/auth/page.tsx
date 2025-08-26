"use client"

import { useState } from "react"
import { SignInForm } from "@/components/auth/sign-in-form"
import { SignUpForm } from "@/components/auth/sign-up-form"

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-mono font-light text-white tracking-[0.3em] uppercase mb-4">Productivity</h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"></div>
        </div>

        {isSignIn ? (
          <SignInForm onToggleMode={() => setIsSignIn(false)} />
        ) : (
          <SignUpForm onToggleMode={() => setIsSignIn(true)} />
        )}
      </div>
    </div>
  )
}
