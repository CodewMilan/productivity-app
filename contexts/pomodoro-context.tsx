"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef } from "react"

interface PomodoroStats {
  totalSessions: number
  todaySessions: number
  totalFocusTime: number 
  streak: number
  lastSessionDate: string
}

interface PomodoroContextType {
  timeLeft: number
  isActive: boolean
  isBreak: boolean
  sessions: number
  stats: PomodoroStats
  displayStyle: "modern" | "retro"
  toggleTimer: () => void
  resetTimer: () => void
  toggleDisplayStyle: () => void
  skipSession: () => void
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined)

const FOCUS_TIME = 25 * 60 
const BREAK_TIME = 5 * 60 

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME)
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessions, setSessions] = useState(0)
  const [displayStyle, setDisplayStyle] = useState<"modern" | "retro">("modern")
  const [stats, setStats] = useState<PomodoroStats>({
    totalSessions: 0,
    todaySessions: 0,
    totalFocusTime: 0,
    streak: 0,
    lastSessionDate: "",
  })
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

 
  useEffect(() => {
    const savedState = localStorage.getItem("productivity-app-pomodoro")
    const savedStats = localStorage.getItem("productivity-app-pomodoro-stats")

    if (savedState) {
      const state = JSON.parse(savedState)
      setTimeLeft(state.timeLeft || FOCUS_TIME)
      setIsBreak(state.isBreak || false)
      setSessions(state.sessions || 0)
      setDisplayStyle(state.displayStyle || "modern")
    }

    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

 
  useEffect(() => {
    const state = {
      timeLeft,
      isBreak,
      sessions,
      displayStyle,
    }
    localStorage.setItem("productivity-app-pomodoro", JSON.stringify(state))
  }, [timeLeft, isBreak, sessions, displayStyle])

 
  useEffect(() => {
    localStorage.setItem("productivity-app-pomodoro-stats", JSON.stringify(stats))
  }, [stats])

 
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)

     
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(isBreak ? "Break time is over!" : "Focus session completed!", {
          body: isBreak ? "Time to get back to work!" : "Take a well-deserved break!",
          icon: "/favicon.ico",
        })
      }

      if (!isBreak) {
       
        const newSessions = sessions + 1
        setSessions(newSessions)

        
        const today = new Date().toDateString()
        const isNewDay = stats.lastSessionDate !== today

        setStats((prev) => ({
          totalSessions: prev.totalSessions + 1,
          todaySessions: isNewDay ? 1 : prev.todaySessions + 1,
          totalFocusTime: prev.totalFocusTime + 25,
          streak: isNewDay
            ? prev.lastSessionDate === new Date(Date.now() - 86400000).toDateString()
              ? prev.streak + 1
              : 1
            : prev.streak,
          lastSessionDate: today,
        }))

        setIsBreak(true)
        setTimeLeft(BREAK_TIME)
      } else {
       
        setIsBreak(false)
        setTimeLeft(FOCUS_TIME)
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, timeLeft, isBreak, sessions, stats.lastSessionDate])

  
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [])

  const toggleTimer = () => setIsActive(!isActive)

  const resetTimer = () => {
    setIsActive(false)
    setIsBreak(false)
    setTimeLeft(FOCUS_TIME)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const skipSession = () => {
    setIsActive(false)
    if (!isBreak) {
      setIsBreak(true)
      setTimeLeft(BREAK_TIME)
    } else {
      setIsBreak(false)
      setTimeLeft(FOCUS_TIME)
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const toggleDisplayStyle = () => {
    setDisplayStyle((prev) => (prev === "modern" ? "retro" : "modern"))
  }

  return (
    <PomodoroContext.Provider
      value={{
        timeLeft,
        isActive,
        isBreak,
        sessions,
        stats,
        displayStyle,
        toggleTimer,
        resetTimer,
        toggleDisplayStyle,
        skipSession,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  )
}

export function usePomodoro() {
  const context = useContext(PomodoroContext)
  if (context === undefined) {
    throw new Error("usePomodoro must be used within a PomodoroProvider")
  }
  return context
}
