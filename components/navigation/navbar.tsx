"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Timer, StickyNote, Calendar, BarChart3, LogOut } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export function Navbar() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = () => {
    signOut()
    router.push("/auth")
  }

  const navItems = [
    { name: "Timer", icon: Timer, path: "/dashboard" },
    { name: "Notes", icon: StickyNote, path: "/dashboard/notes" },
    { name: "Calendar", icon: Calendar, path: "/dashboard/calendar" },
    { name: "Tracker", icon: BarChart3, path: "/dashboard/tracker" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black via-gray-900 to-black border-b border-gray-800/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-mono font-light text-white tracking-[0.2em] uppercase">Productivity</h1>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.path
                return (
                  <button
                    key={item.name}
                    onClick={() => router.push(item.path)}
                    className={`flex items-center px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 ${
                      isActive ? "bg-white text-black" : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 font-mono text-sm hidden sm:block">{user?.name}</span>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 font-mono"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex items-center justify-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.path)}
                  className={`flex flex-col items-center px-3 py-2 rounded-lg font-mono text-xs transition-all duration-200 ${
                    isActive ? "bg-white text-black" : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <item.icon className="w-4 h-4 mb-1" />
                  {item.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
