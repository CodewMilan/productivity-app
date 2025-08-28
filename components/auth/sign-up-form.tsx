"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SignUpFormProps {
  onToggleMode: () => void
}

export function SignUpForm({ onToggleMode }: SignUpFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { signUp, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!email || !password || !name) {
      setError("Please fill in all fields")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    const ok = await signUp(email, password, name)
    if (!ok) {
      setError("Sign up failed. Try again.")
    } else {
      setSuccess("Account created! Please check your email to confirm your address.")
      setEmail("")
     setPassword("")
      setName("")
    }
  }

  return (
    <Card className="w-full max-w-md bg-gradient-to-b from-gray-900 to-black border-gray-800/40">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-mono text-white tracking-wider">Sign Up</CardTitle>
        <CardDescription className="text-gray-400 font-mono text-sm">
          Create your productivity account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300 font-mono text-sm">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-black border-gray-700 text-white font-mono"
              placeholder="Enter your name"
            />
          </div>
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
          {success && <p className="text-green-400 text-sm font-mono">{success}</p>}
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-200 font-mono"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={onToggleMode}
            className="text-gray-400 hover:text-white font-mono text-sm transition-colors"
          >
            Already have an account? Sign in
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
