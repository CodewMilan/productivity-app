import type React from "react"
import type { Metadata } from "next"
import { Kode_Mono } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"
import { NotesProvider } from "@/contexts/notes-context"
import { CalendarProvider } from "@/contexts/calendar-context"
import { PomodoroProvider } from "@/contexts/pomodoro-context"
import { TabTrackerProvider } from "@/contexts/tab-tracker-context"
import "./globals.css"

const kodeMono = Kode_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kode-mono",
})

export const metadata: Metadata = {
  title: "Productivity App",
  description: "A comprehensive productivity app with Pomodoro timer, notes, calendar, and more",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${kodeMono.variable} antialiased dark`}>
      <body className="font-mono">
        <AuthProvider>
          <PomodoroProvider>
            <TabTrackerProvider>
              <NotesProvider>
                <CalendarProvider>{children}</CalendarProvider>
              </NotesProvider>
            </TabTrackerProvider>
          </PomodoroProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
