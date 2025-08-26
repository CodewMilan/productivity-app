"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CalendarGrid } from "@/components/calendar/calendar-grid"
import { ReminderList } from "@/components/calendar/reminder-list"
import { ReminderEditor } from "@/components/calendar/reminder-editor"

interface Reminder {
  id: string
  title: string
  description: string
  date: string
  time: string
  createdAt: Date
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [editingReminder, setEditingReminder] = useState<Reminder | undefined>(undefined)

  const handleCreateReminder = () => {
    setEditingReminder(undefined)
    setShowEditor(true)
  }

  const handleEditReminder = (reminder: Reminder) => {
    setEditingReminder(reminder)
    setShowEditor(true)
  }

  const handleCloseEditor = () => {
    setShowEditor(false)
    setEditingReminder(undefined)
  }

  return (
    <div className="p-6 min-h-[calc(100vh-5rem)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-mono font-light text-white tracking-[0.3em] uppercase mb-4">Calendar</h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            <CalendarGrid selectedDate={selectedDate} onDateSelect={setSelectedDate} />
          </div>

          {/* Reminder List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-mono text-white">Reminders</h2>
              <Button
                onClick={handleCreateReminder}
                size="sm"
                className="bg-white text-black hover:bg-gray-200 font-mono"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
            <ReminderList selectedDate={selectedDate} onEditReminder={handleEditReminder} />
          </div>
        </div>

        {/* Reminder Editor Modal */}
        {showEditor && (
          <ReminderEditor reminder={editingReminder} selectedDate={selectedDate} onClose={handleCloseEditor} />
        )}
      </div>
    </div>
  )
}
