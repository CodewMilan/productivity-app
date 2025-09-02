"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

interface AuthContextType {
  user: any
  isLoading: boolean
  signUp: (email: string, password: string, name: string) => Promise<boolean>
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => Promise<void>
  id:string
  email: string
  name: string
  age?: number
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }, 
      },
    })
    setIsLoading(false)
    if (error) return false
    setUser(data.user)
    return true
  }

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setIsLoading(false)
    if (error) return false
    setUser(data.user)
    return true
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const updateProfile = async (updates: { name?: string; age?: number }) => {
    if (!user) return
    const existingUsers = JSON.parse(localStorage.getItem("auth-users") || "[]")
    const idx = existingUsers.findIndex((u: any) => u.id === user.id)
    if (idx !== -1) {
      const current = existingUsers[idx]
      const updatedUser: User = {
        id: current.id,
        email: current.email,
        name: updates.name ?? current.name,
        age: typeof updates.age === "number" ? updates.age : current.age,
      }
   
      existingUsers[idx] = { ...current, ...updatedUser }
      localStorage.setItem("auth-users", JSON.stringify(existingUsers))
      localStorage.setItem("auth-user", JSON.stringify(updatedUser))
      setUser(updatedUser)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used inside AuthProvider")
  return context
}
