"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Reminder {
  id: string
  title: string
  description: string
  date: string // YYYY-MM-DD format
  time: string // HH:MM format
  createdAt: Date
}

interface CalendarContextType {
  reminders: Reminder[]
  addReminder: (title: string, description: string, date: string, time: string) => void
  updateReminder: (id: string, title: string, description: string, date: string, time: string) => void
  deleteReminder: (id: string) => void
  getRemindersForDate: (date: string) => Reminder[]
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined)

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>([])

  useEffect(() => {
    const storedReminders = localStorage.getItem("productivity-app-reminders")
    if (storedReminders) {
      const parsedReminders = JSON.parse(storedReminders).map((reminder: any) => ({
        ...reminder,
        createdAt: new Date(reminder.createdAt),
      }))
      setReminders(parsedReminders)
    }
  }, [])

  const saveReminders = (updatedReminders: Reminder[]) => {
    setReminders(updatedReminders)
    localStorage.setItem("productivity-app-reminders", JSON.stringify(updatedReminders))
  }

  const addReminder = (title: string, description: string, date: string, time: string) => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      title,
      description,
      date,
      time,
      createdAt: new Date(),
    }
    const updatedReminders = [...reminders, newReminder].sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`)
      const dateTimeB = new Date(`${b.date}T${b.time}`)
      return dateTimeA.getTime() - dateTimeB.getTime()
    })
    saveReminders(updatedReminders)
  }

  const updateReminder = (id: string, title: string, description: string, date: string, time: string) => {
    const updatedReminders = reminders
      .map((reminder) => (reminder.id === id ? { ...reminder, title, description, date, time } : reminder))
      .sort((a, b) => {
        const dateTimeA = new Date(`${a.date}T${a.time}`)
        const dateTimeB = new Date(`${b.date}T${b.time}`)
        return dateTimeA.getTime() - dateTimeB.getTime()
      })
    saveReminders(updatedReminders)
  }

  const deleteReminder = (id: string) => {
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id)
    saveReminders(updatedReminders)
  }

  const getRemindersForDate = (date: string): Reminder[] => {
    return reminders.filter((reminder) => reminder.date === date)
  }

  return (
    <CalendarContext.Provider value={{ reminders, addReminder, updateReminder, deleteReminder, getRemindersForDate }}>
      {children}
    </CalendarContext.Provider>
  )
}

export function useCalendar() {
  const context = useContext(CalendarContext)
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider")
  }
  return context
}
