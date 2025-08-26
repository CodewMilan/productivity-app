"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Edit, Trash2, Clock } from "lucide-react"
import { useCalendar } from "@/contexts/calendar-context"

interface Reminder {
  id: string
  title: string
  description: string
  date: string
  time: string
  createdAt: Date
}

interface ReminderListProps {
  selectedDate: string | null
  onEditReminder: (reminder: Reminder) => void
}

export function ReminderList({ selectedDate, onEditReminder }: ReminderListProps) {
  const { getRemindersForDate, deleteReminder } = useCalendar()

  if (!selectedDate) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 border border-gray-800/40">
        <p className="text-gray-400 font-mono text-center">Select a date to view reminders</p>
      </div>
    )
  }

  const reminders = getRemindersForDate(selectedDate)
  const formattedDate = new Date(selectedDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this reminder?")) {
      deleteReminder(id)
    }
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 border border-gray-800/40">
      <div className="mb-6">
        <h3 className="text-lg font-mono text-white mb-2">{formattedDate}</h3>
        <div className="w-12 h-px bg-gradient-to-r from-white/30 to-transparent"></div>
      </div>

      {reminders.length === 0 ? (
        <p className="text-gray-400 font-mono text-center py-8">No reminders for this date</p>
      ) : (
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <Card key={reminder.id} className="bg-black/50 border-gray-700/50 hover:border-gray-600/50 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-mono font-medium mb-1">{reminder.title}</h4>
                    <div className="flex items-center text-gray-400 font-mono text-sm">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTime(reminder.time)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Button
                      onClick={() => onEditReminder(reminder)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-2"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(reminder.id)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-red-400 hover:bg-gray-800/50 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {reminder.description && (
                <CardContent className="pt-0">
                  <p className="text-gray-300 font-mono text-sm leading-relaxed">{reminder.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
