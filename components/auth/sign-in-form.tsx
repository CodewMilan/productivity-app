"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SignInFormProps {
  onToggleMode: () => void
}

export function SignInForm({ onToggleMode }: SignInFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { signIn, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    const success = await signIn(email, password)
    if (!success) {
      setError("Invalid email or password")
    }
  }

  return (
    <Card className="w-full max-w-md bg-gradient-to-b from-gray-900 to-black border-gray-800/40">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-mono text-white tracking-wider">Sign In</CardTitle>
        <CardDescription className="text-gray-400 font-mono text-sm">
          Access your productivity dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300 font-mono text-sm">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black border-gray-700 text-white font-mono"
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300 font-mono text-sm">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black border-gray-700 text-white font-mono"
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-red-400 text-sm font-mono">{error}</p>}
          <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 font-mono" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <button onClick={onToggleMode} className="text-gray-400 hover:text-white font-mono text-sm transition-colors">
            Don't have an account? Sign up
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
