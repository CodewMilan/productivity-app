"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (email: string, password: string, name: string) => Promise<boolean>
  signOut: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("productivity-app-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    const storedUsers = JSON.parse(localStorage.getItem("productivity-app-users") || "[]")
    const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password)

    if (foundUser) {
      const userSession = { id: foundUser.id, email: foundUser.email, name: foundUser.name }
      setUser(userSession)
      localStorage.setItem("productivity-app-user", JSON.stringify(userSession))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true)

    const storedUsers = JSON.parse(localStorage.getItem("productivity-app-users") || "[]")
    const existingUser = storedUsers.find((u: any) => u.email === email)

    if (existingUser) {
      setIsLoading(false)
      return false // User already exists
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
    }

    storedUsers.push(newUser)
    localStorage.setItem("productivity-app-users", JSON.stringify(storedUsers))

    const userSession = { id: newUser.id, email: newUser.email, name: newUser.name }
    setUser(userSession)
    localStorage.setItem("productivity-app-user", JSON.stringify(userSession))

    setIsLoading(false)
    return true
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("productivity-app-user")
  }

  return <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
