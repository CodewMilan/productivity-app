"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export function LandingHeader() {
  const { user } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
          </div>
          <span className="text-xl font-mono font-medium text-foreground">Productivity</span>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <Button asChild variant="outline">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/auth">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
