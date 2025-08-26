import type React from "react"
import { Navbar } from "@/components/navigation/navbar"
import { MiniTimer } from "@/components/pomodoro/mini-timer"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Navbar />
      <main className="pt-16 md:pt-20">{children}</main>
      <MiniTimer />
    </div>
  )
}
