"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCalendar } from "@/contexts/calendar-context"

interface CalendarGridProps {
  selectedDate: string | null
  onDateSelect: (date: string) => void
}

export function CalendarGrid({ selectedDate, onDateSelect }: CalendarGridProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { getRemindersForDate } = useCalendar()

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const formatDateString = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const isToday = (day: number) => {
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
  }

  const isSelected = (day: number) => {
    return selectedDate === formatDateString(day)
  }

  const hasReminders = (day: number) => {
    return getRemindersForDate(formatDateString(day)).length > 0
  }

  const renderCalendarDays = () => {
    const days = []

    
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>)
    }

   
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDateString(day)
      const isCurrentDay = isToday(day)
      const isSelectedDay = isSelected(day)
      const hasRemindersForDay = hasReminders(day)

      days.push(
        <button
          key={day}
          onClick={() => onDateSelect(dateString)}
          className={`h-12 w-full rounded-lg font-mono text-sm transition-all duration-200 relative ${
            isSelectedDay
              ? "bg-white text-black"
              : isCurrentDay
                ? "bg-gray-800 text-white border border-gray-600"
                : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
          }`}
        >
          {day}
          {hasRemindersForDay && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
          )}
        </button>,
      )
    }

    return days
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 border border-gray-800/40">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={previousMonth}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-gray-800/50"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-mono text-white tracking-wider">
          {monthNames[month]} {year}
        </h2>
        <Button
          onClick={nextMonth}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-gray-800/50"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {dayNames.map((dayName) => (
          <div key={dayName} className="h-8 flex items-center justify-center">
            <span className="text-gray-500 font-mono text-xs uppercase tracking-wider">{dayName}</span>
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>
    </div>
  )
}
