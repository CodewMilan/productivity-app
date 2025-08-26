"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface TabActivity {
  date: string
  tabSwitches: number
  focusTime: number // in seconds
  blurTime: number // in seconds
  pageViews: number
  mostActiveHour: number
}

interface TabStats {
  todayActivity: TabActivity
  weeklyAverage: number
  totalTabSwitches: number
  averageFocusTime: number
  productivityScore: number
}

interface TabTrackerContextType {
  stats: TabStats
  isTracking: boolean
  toggleTracking: () => void
  resetDailyStats: () => void
}

const TabTrackerContext = createContext<TabTrackerContextType | undefined>(undefined)

export function TabTrackerProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<TabStats>({
    todayActivity: {
      date: new Date().toDateString(),
      tabSwitches: 0,
      focusTime: 0,
      blurTime: 0,
      pageViews: 1,
      mostActiveHour: new Date().getHours(),
    },
    weeklyAverage: 0,
    totalTabSwitches: 0,
    averageFocusTime: 0,
    productivityScore: 100,
  })
  const [isTracking, setIsTracking] = useState(true)
  const [lastFocusTime, setLastFocusTime] = useState(Date.now())
  const [isPageVisible, setIsPageVisible] = useState(true)

  // Load saved stats on mount
  useEffect(() => {
    const savedStats = localStorage.getItem("productivity-app-tab-stats")
    if (savedStats) {
      const parsedStats = JSON.parse(savedStats)
      const today = new Date().toDateString()

      // Check if it's a new day
      if (parsedStats.todayActivity.date !== today) {
        // Archive yesterday's data and start fresh
        const historicalData = JSON.parse(localStorage.getItem("productivity-app-tab-history") || "[]")
        historicalData.push(parsedStats.todayActivity)

        // Keep only last 30 days
        if (historicalData.length > 30) {
          historicalData.splice(0, historicalData.length - 30)
        }

        localStorage.setItem("productivity-app-tab-history", JSON.stringify(historicalData))

        // Calculate weekly average
        const lastWeek = historicalData.slice(-7)
        const weeklyAverage =
          lastWeek.length > 0 ? lastWeek.reduce((sum, day) => sum + day.tabSwitches, 0) / lastWeek.length : 0

        setStats({
          ...parsedStats,
          todayActivity: {
            date: today,
            tabSwitches: 0,
            focusTime: 0,
            blurTime: 0,
            pageViews: 1,
            mostActiveHour: new Date().getHours(),
          },
          weeklyAverage,
        })
      } else {
        setStats(parsedStats)
      }
    }

    // Track initial page view
    setStats((prev) => ({
      ...prev,
      todayActivity: {
        ...prev.todayActivity,
        pageViews: prev.todayActivity.pageViews + 1,
      },
    }))
  }, [])

  // Save stats whenever they change
  useEffect(() => {
    localStorage.setItem("productivity-app-tab-stats", JSON.stringify(stats))
  }, [stats])

  // Page Visibility API tracking
  useEffect(() => {
    if (!isTracking) return

    const handleVisibilityChange = () => {
      const now = Date.now()
      const isVisible = !document.hidden

      if (isVisible && !isPageVisible) {
        // Page became visible (user switched back to this tab)
        setStats((prev) => ({
          ...prev,
          todayActivity: {
            ...prev.todayActivity,
            tabSwitches: prev.todayActivity.tabSwitches + 1,
            mostActiveHour: new Date().getHours(),
          },
          totalTabSwitches: prev.totalTabSwitches + 1,
        }))
        setLastFocusTime(now)
      } else if (!isVisible && isPageVisible) {
        // Page became hidden (user switched to another tab)
        const focusTime = Math.floor((now - lastFocusTime) / 1000)
        setStats((prev) => ({
          ...prev,
          todayActivity: {
            ...prev.todayActivity,
            focusTime: prev.todayActivity.focusTime + focusTime,
          },
        }))
      }

      setIsPageVisible(isVisible)
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [isTracking, isPageVisible, lastFocusTime])

  // Window focus/blur tracking
  useEffect(() => {
    if (!isTracking) return

    const handleFocus = () => {
      const now = Date.now()
      setLastFocusTime(now)
      setStats((prev) => ({
        ...prev,
        todayActivity: {
          ...prev.todayActivity,
          tabSwitches: prev.todayActivity.tabSwitches + 1,
        },
        totalTabSwitches: prev.totalTabSwitches + 1,
      }))
    }

    const handleBlur = () => {
      const now = Date.now()
      const focusTime = Math.floor((now - lastFocusTime) / 1000)
      setStats((prev) => ({
        ...prev,
        todayActivity: {
          ...prev.todayActivity,
          focusTime: prev.todayActivity.focusTime + focusTime,
          blurTime: prev.todayActivity.blurTime + 1,
        },
      }))
    }

    window.addEventListener("focus", handleFocus)
    window.addEventListener("blur", handleBlur)

    return () => {
      window.removeEventListener("focus", handleFocus)
      window.removeEventListener("blur", handleBlur)
    }
  }, [isTracking, lastFocusTime])

  // Calculate productivity score
  useEffect(() => {
    const { focusTime, tabSwitches, blurTime } = stats.todayActivity
    const totalTime = focusTime + blurTime

    let score = 100

    // Reduce score based on excessive tab switching
    if (tabSwitches > 50) score -= Math.min(30, (tabSwitches - 50) * 0.5)

    // Increase score based on focus time ratio
    if (totalTime > 0) {
      const focusRatio = focusTime / totalTime
      score = Math.max(0, Math.min(100, score * focusRatio + 20))
    }

    setStats((prev) => ({
      ...prev,
      productivityScore: Math.round(score),
      averageFocusTime: focusTime > 0 ? Math.round(focusTime / Math.max(1, tabSwitches)) : 0,
    }))
  }, [stats.todayActivity])

  const toggleTracking = () => {
    setIsTracking(!isTracking)
  }

  const resetDailyStats = () => {
    setStats((prev) => ({
      ...prev,
      todayActivity: {
        date: new Date().toDateString(),
        tabSwitches: 0,
        focusTime: 0,
        blurTime: 0,
        pageViews: 1,
        mostActiveHour: new Date().getHours(),
      },
    }))
  }

  return (
    <TabTrackerContext.Provider value={{ stats, isTracking, toggleTracking, resetDailyStats }}>
      {children}
    </TabTrackerContext.Provider>
  )
}

export function useTabTracker() {
  const context = useContext(TabTrackerContext)
  if (context === undefined) {
    throw new Error("useTabTracker must be used within a TabTrackerProvider")
  }
  return context
}
